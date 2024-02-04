import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  useMediaQuery,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  TextField,
  Link,
  Snackbar,
  IconButton,
  Tooltip,
  LinearProgress,
  Box,
} from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import makeStyles from "@mui/styles/makeStyles";
import CloseIcon from "@mui/icons-material/Close";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sessionActions } from "../store";
import {
  useLocalization,
  useTranslation,
} from "../common/components/LocalizationProvider";
// import LoginLayout from "./LoginLayout";
import usePersistedState from "../common/util/usePersistedState";
import {
  handleLoginTokenListeners,
  nativeEnvironment,
  nativePostMessage,
} from "../common/components/NativeInterface";
import { useCatch } from "../reactHelper";
import "../css/loginpage.css";

const useStyles = makeStyles((theme) => ({
  options: {
    position: "fixed",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  textfield: {
    "& .MuiOutlinedInput-root": {
      fontSize: "16px",
      backgroundColor: "#f0f0f0",
      width: "300px",
      color: "#333",
      "& fieldset": {
        borderColor: "#4caf50",
      },
      "&:hover fieldset": {
        borderColor: "#45a049",
      },
      "& input::placeholder": {
        color: "#999", // Custom placeholder color
      },
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  extraContainer: {
    display: "flex",
    gap: theme.spacing(2),
  },
  registerButton: {
    minWidth: "unset",
  },
  resetPassword: {
    cursor: "pointer",
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const t = useTranslation();

  const { languages, language, setLanguage } = useLocalization();
  const languageList = Object.entries(languages).map((values) => ({
    code: values[0],
    country: values[1].country,
    name: values[1].name,
  }));

  const [failed, setFailed] = useState(false);

  const [email, setEmail] = usePersistedState("loginEmail", "");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const registrationEnabled = useSelector(
    (state) => state.session.server.registration
  );
  const languageEnabled = useSelector(
    (state) => !state.session.server.attributes["ui.disableLoginLanguage"]
  );
  const changeEnabled = useSelector(
    (state) => !state.session.server.attributes.disableChange
  );
  const emailEnabled = useSelector(
    (state) => state.session.server.emailEnabled
  );
  const openIdEnabled = useSelector(
    (state) => state.session.server.openIdEnabled
  );
  const openIdForced = useSelector(
    (state) =>
      state.session.server.openIdEnabled && state.session.server.openIdForce
  );
  const [codeEnabled, setCodeEnabled] = useState(false);

  const [announcementShown, setAnnouncementShown] = useState(false);
  const announcement = useSelector(
    (state) => state.session.server.announcement
  );

  const generateLoginToken = async () => {
    if (nativeEnvironment) {
      let token = "";
      try {
        const expiration = dayjs().add(6, "months").toISOString();
        const response = await fetch("/api/session/token", {
          method: "POST",
          body: new URLSearchParams(`expiration=${expiration}`),
        });
        if (response.ok) {
          token = await response.text();
        }
      } catch (error) {
        token = "";
      }
      nativePostMessage(`login|${token}`);
    }
  };

  const handlePasswordLogin = async (event) => {
    event.preventDefault();
    setFailed(false);
    try {
      const query = `email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`;
      const response = await fetch("/api/session", {
        method: "POST",
        body: new URLSearchParams(
          code.length ? query + `&code=${code}` : query
        ),
      });
      if (response.ok) {
        const user = await response.json();
        generateLoginToken();
        dispatch(sessionActions.updateUser(user));
        navigate("/");
      } else if (
        response.status === 401 &&
        response.headers.get("WWW-Authenticate") === "TOTP"
      ) {
        setCodeEnabled(true);
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      setFailed(true);
      setPassword("");
    }
  };

  const handleTokenLogin = useCatch(async (token) => {
    const response = await fetch(
      `/api/session?token=${encodeURIComponent(token)}`
    );
    if (response.ok) {
      const user = await response.json();
      dispatch(sessionActions.updateUser(user));
      navigate("/");
    } else {
      throw Error(await response.text());
    }
  });

  const handleSpecialKey = (e) => {
    if (e.keyCode === 13 && email && password && (!codeEnabled || code)) {
      handlePasswordLogin(e);
    }
  };

  const handleOpenIdLogin = () => {
    document.location = "/api/session/openid/auth";
  };

  useEffect(() => nativePostMessage("authentication"), []);

  useEffect(() => {
    const listener = (token) => handleTokenLogin(token);
    handleLoginTokenListeners.add(listener);
    return () => handleLoginTokenListeners.delete(listener);
  }, []);

  if (openIdForced) {
    handleOpenIdLogin();
    return <LinearProgress />;
  }
  return (
    <div className="container">
      <div className="container_wrapper">
        <div className="banner_container2">
          <div className="signup_return">
            <h3>We've got it all for you.</h3>
            <div className="gotosignup">
              <a onClick={()=>navigate('/register')}>Create An Account</a>
            </div>
          </div>
        </div>
        <div className="login_template">
          <div className="login_wrapper">
            <div className="login_header">
              <span>GoToApp</span>
            </div>
            <div className="main_login">
              <div>
                <label htmlFor="email">
                {t('userEmail')}
                  {failed && 
                  <span>*Invalid username or password</span>
                  }
                </label>
                <input
                  required
                  value={email}
                  autoComplete="email"
                  autoFocus={!email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={handleSpecialKey}
                  type="text"
                  name="email"
                />
              </div>
              <div>
                <label htmlFor="password">{t('userPassword')}</label>
                <input
                  required
                  value={password}
                  autoComplete="current-password"
                  autoFocus={!email}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={handleSpecialKey}
                  type="password"
                  name="password"
                />
              </div>
              {codeEnabled && (
                <div>
                  <label htmlFor="code">{t('loginTotpCode')}</label>
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyUp={handleSpecialKey}
                    type="number"
                    name="code"
                    required
                  />
                </div>
             )}
              <button
                onClick={handlePasswordLogin}
                onKeyUp={handleSpecialKey}
                color="white"
                disabled={!email || !password || (codeEnabled && !code)}
              >
                {t('loginLogin')}
              </button>
              {openIdEnabled && (
                <button onClick={() => handleOpenIdLogin()}>{t('loginOpenId')}</button>
               )} 
            </div>
            <div className="horizontal">
              <div className="line">
                <hr/>
              </div>
                <span>OR</span>
                <div className="line">
                  <hr/>
                </div>
            </div>
            <div className="register">
                <button onClick={()=>navigate('/register')} disabled={!registrationEnabled}>{t('loginRegister')}</button>
            </div>
                    {languageEnabled && (
                    <div className="language">
              <Select 
              // label={t('loginLanguage')}
              value={language} onChange={(e) => setLanguage(e.target.value)}
              sx={{
                '& .MuiSelect-icon': {
                  // Styles specifically for the arrow-down button
                  color: 'rgb(206, 71, 94)', // Change the color as needed
                },
                width:'100%',
                backgroundColor:'rgb(238, 237, 237)',
                color:'black',
                border:'1px black solid',
                borderRadius:'10px',
              }}
              >
                {languageList.map((it) => (
                  <MenuItem key={it.code} value={it.code}>
                    <Box component="span" sx={{ mr: 1 }}>
                      <ReactCountryFlag countryCode={it.country} svg />
                    </Box>
                    {it.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          {emailEnabled && (
          <div className="forget_password">
                 <span>forget password? </span>
                  <a href="/reset-password"> {t('loginReset')}</a>
          </div>
           )} 
              <Snackbar
      open={!!announcement && !announcementShown}
      message={announcement}
      action={(
        <IconButton size="small" color="inherit" onClick={() => setAnnouncementShown(true)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}     />
      <footer className="copyright">
        <span>Copyright @2024,GoToApp all rights reserved</span>
      </footer>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <LoginLayout>
  //     <div className={classes.options}>
  //       {nativeEnvironment && changeEnabled && (
  //         <Tooltip title={t('settingsServer')}>
  //           <IconButton onClick={() => navigate('/change-server')}>
  //             <LockOpenIcon />
  //           </IconButton>
  //         </Tooltip>
  //       )}
  //     </div>
  //     <div className={classes.container}>
  //       {useMediaQuery(theme.breakpoints.down('lg')) && <LogoImage color={theme.palette.primary.main} />}
  //       <TextField
  //         required
  //         error={failed}
  //         label={t('userEmail')}
  //         name="email"
  //         value={email}
  //         autoComplete="email"
  //         autoFocus={!email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         onKeyUp={handleSpecialKey}
  //         helperText={failed && 'Invalid username or password'}
  //       />
  //       <TextField
  //         required
  //         error={failed}
  //         label={t('userPassword')}
  //         name="password"
  //         value={password}
  //         type="password"
  //         autoComplete="current-password"
  //         autoFocus={!!email}
  //         onChange={(e) => setPassword(e.target.value)}
  //         onKeyUp={handleSpecialKey}
  //       />
  //       {codeEnabled && (
  //         <TextField
  //           required
  //           error={failed}
  //           label={t('loginTotpCode')}
  //           name="code"
  //           value={code}
  //           type="number"
  //           onChange={(e) => setCode(e.target.value)}
  //           onKeyUp={handleSpecialKey}
  //         />
  //       )}
  //       <Button
  //         onClick={handlePasswordLogin}
  //         onKeyUp={handleSpecialKey}
  //         variant="contained"
  //         color="secondary"
  //         disabled={!email || !password || (codeEnabled && !code)}
  //       >
  //         {t('loginLogin')}
  //       </Button>
  //       {openIdEnabled && (
  //         <Button
  //           onClick={() => handleOpenIdLogin()}
  //           variant="contained"
  //           color="secondary"
  //         >
  //           {t('loginOpenId')}
  //         </Button>
  //       )}
  //       <div className={classes.extraContainer}>
  //         <Button
  //           className={classes.registerButton}
  //           onClick={() => navigate('/register')}
  //           disabled={!registrationEnabled}
  //           color="secondary"
  //         >
  //           {t('loginRegister')}
  //         </Button>
  //         {languageEnabled && (
  //           <FormControl fullWidth>
  //             <InputLabel>{t('loginLanguage')}</InputLabel>
  //             <Select label={t('loginLanguage')} value={language} onChange={(e) => setLanguage(e.target.value)}>
  //               {languageList.map((it) => (
  //                 <MenuItem key={it.code} value={it.code}>
  //                   <Box component="span" sx={{ mr: 1 }}>
  //                     <ReactCountryFlag countryCode={it.country} svg />
  //                   </Box>
  //                   {it.name}
  //                 </MenuItem>
  //               ))}
  //             </Select>
  //           </FormControl>
  //         )}
  //       </div>
  //       {emailEnabled && (
  //         <Link
  //           onClick={() => navigate('/reset-password')}
  //           className={classes.resetPassword}
  //           underline="none"
  //           variant="caption"
  //         >
  //           {t('loginReset')}
  //         </Link>
  //       )}
  //     </div>
  //     <Snackbar
  //       open={!!announcement && !announcementShown}
  //       message={announcement}
  //       action={(
  //         <IconButton size="small" color="inherit" onClick={() => setAnnouncementShown(true)}>
  //           <CloseIcon fontSize="small" />
  //         </IconButton>
  //       )}
  //     />
  //   </LoginLayout>
  // );
};

export default LoginPage;
