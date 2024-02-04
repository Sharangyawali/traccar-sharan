import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, TextField, Typography, Snackbar, IconButton,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginLayout from './LoginLayout';
import { useTranslation } from '../common/components/LocalizationProvider';
import { snackBarDurationShortMs } from '../common/util/duration';
import { useCatch, useEffectAsync } from '../reactHelper';
import { sessionActions } from '../store';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.spacing(3),
    fontWeight: 500,
    marginLeft: theme.spacing(1),
    textTransform: 'uppercase',
  },
}));

const RegisterPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const t = useTranslation();

  const server = useSelector((state) => state.session.server);
  const totpForce = useSelector((state) => state.session.server.attributes.totpForce);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpKey, setTotpKey] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffectAsync(async () => {
    if (totpForce) {
      const response = await fetch('/api/users/totp', { method: 'POST' });
      if (response.ok) {
        setTotpKey(await response.text());
      } else {
        throw Error(await response.text());
      }
    }
  }, [totpForce, setTotpKey]);

  const handleSubmit = useCatch(async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, totpKey }),
    });
    if (response.ok) {
      setSnackbarOpen(true);
    } else {
      throw Error(await response.text());
    }
  });

  return (
    <div className="container">
    <div className="container_wrapper">
      <div className="banner_container2">
        <div className="signup_return">
          <h3>We've got it all for you.</h3>
          {!server.newServer && (
          <div className="gotosignup">
            <a onClick={()=>navigate('/login')}>Already Have An Account</a>
          </div>
          )}
        </div>
      </div>
      <div className="login_template">
        <div className="login_wrapper">
          <div className="login_header">
            <span>GoToApp</span>
          </div>
          <div className="main_login">
          <div>
              <label htmlFor="name">
              {t('sharedName')}
              </label>
              <input
                required
                value={name}
                autoComplete="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                name="name"
              />
            </div>
            <div>
              <label htmlFor="email">
              {t('userEmail')}
              </label>
              <input
                required
                value={email}
                autoComplete="email"
                autoFocus={!email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                name="password"
              />
            </div>
            {totpForce && (
              <div>
                <label htmlFor="code">{t('loginTotpKey')}</label>
                <input 
                  readOnly
                  value={code}
                  onKeyUp={handleSpecialKey}
                  name="totpKey"
                  required
                />
              </div>
           )}
            <button
              onClick={handleSubmit}
              color="white"
              disabled={!name || !password || !(server.newServer || /(.+)@(.+)\.(.{2,})/.test(email))}
            >
              {t('loginRegister')}
            </button>
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
          {!server.newServer && (
          <div className="register">
              <button onClick={()=>navigate('/login')}>Sign in</button>
          </div>
          )}
             <Snackbar
         open={snackbarOpen}
         onClose={() => {
           dispatch(sessionActions.updateServer({ ...server, newServer: false }));
           navigate('/login');
         }}
         autoHideDuration={snackBarDurationShortMs}
         message={t('loginCreated')}
       />
    <footer className="copyright">
      <span>Copyright @2024,GoToApp all rights reserved</span>
    </footer>
        </div>
      </div>
    </div>
  </div>

    // <LoginLayout>
    //   <div className={classes.container}>
    //     <div className={classes.header}>
    //       {!server.newServer && (
    //         <IconButton color="primary" onClick={() => navigate('/login')}>
    //           <ArrowBackIcon />
    //         </IconButton>
    //       )}
    //       <Typography className={classes.title} color="primary">
    //         {t('loginRegister')}
    //       </Typography>
    //     </div>
    //     <TextField
    //       required
    //       label={t('sharedName')}
    //       name="name"
    //       value={name}
    //       autoComplete="name"
    //       autoFocus
    //       onChange={(event) => setName(event.target.value)}
    //     />
    //     <TextField
    //       required
    //       type="email"
    //       label={t('userEmail')}
    //       name="email"
    //       value={email}
    //       autoComplete="email"
    //       onChange={(event) => setEmail(event.target.value)}
    //     />
    //     <TextField
    //       required
    //       label={t('userPassword')}
    //       name="password"
    //       value={password}
    //       type="password"
    //       autoComplete="current-password"
    //       onChange={(event) => setPassword(event.target.value)}
    //     />
    //     {totpForce && (
    //       <TextField
    //         required
    //         label={t('loginTotpKey')}
    //         name="totpKey"
    //         value={totpKey || ''}
    //         InputProps={{
    //           readOnly: true,
    //         }}
    //       />
    //     )}
    //     <Button
    //       variant="contained"
    //       color="secondary"
    //       onClick={handleSubmit}
    //       disabled={!name || !password || !(server.newServer || /(.+)@(.+)\.(.{2,})/.test(email))}
    //       fullWidth
    //     >
    //       {t('loginRegister')}
    //     </Button>
    //   </div>
    //   <Snackbar
    //     open={snackbarOpen}
    //     onClose={() => {
    //       dispatch(sessionActions.updateServer({ ...server, newServer: false }));
    //       navigate('/login');
    //     }}
    //     autoHideDuration={snackBarDurationShortMs}
    //     message={t('loginCreated')}
    //   />
    // </LoginLayout>
  );
};

export default RegisterPage;
