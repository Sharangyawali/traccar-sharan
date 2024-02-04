package org.traccar.protocol;

import org.junit.jupiter.api.Test;
import org.traccar.ProtocolTest;

public class TmgProtocolDecoderTest extends ProtocolTest {

    @Test
    public void testDecode() throws Exception {

        var decoder = inject(new TmgProtocolDecoder(null));

        verifyPosition(decoder, text(
                "$loc,869309013800417,08032014,094459,1,2826.1956,N,07659.7690,E,0.0,2.5,4441,31,6,95,1,LLLL,NNTN,HH,0.15,0.26,HR38AU1389,0,SW0.1a"));

        verifyPosition(decoder, text(
                "$bak,864502037999604,21112017,120243,1,2826.5958,N,07718.6468,E,000.0,139.66,52847,22,4,-174,0,LLLL,NNTN,HH,0.12,3.03,301116001,0,VER00.1a"));

        verifyNull(decoder, text(
                "$iof,864502037999604,2282132017,8124280,0,299136216.-482258576,¥,1379245398.818734676,,-69969973.0,1153454437.-1986834092,492097799,20,0,-320,0,LLLL,NNTN,HH,0.17,3.01,301116001,0,VER00.1a"));

        verifyPosition(decoder, text(
                "$nor,L,868325023006341,14022017,103947,1,2836.6542,N,07706.2504,E,0.0,0.0,0.0,0.0,0,22,VODAFONE - DELH,15,49B7,1,2.57,13.2,00000010,00000000,0111,00.0,00.0,0.0,SW10.12,NA,#"));

        verifyPosition(decoder, text(
                "$rid,L,868325023006341,14022017,103706,1,2836.6542,N,07706.2504,E,0.0,0.0,0.0,0.0,0,22,VODAFONE - DELH,15,49B7,1,2.57,13.2,00000011,00000000,0111,00.0,00.0,0.0,SW10.12,0004909463,#"));

        verifyPosition(decoder, text(
                "$ion,H,868324023777431,27012017,101057,4,2830.2952,N,07705.2532,E,0.0,202.38,225.9,1.22,8,20,N.A,0,N.A,1,4.09,00.0,00000111,00000000,1101,00.0-00.0,00.0-0.0,4.42,01.02,#"));

        verifyPosition(decoder, text(
                "$iof,H,868324023777431,27012017,101111,4,2830.2952,N,07705.2532,E,0.0,202.38,225.9,0.87,11,21,N.A,25,N.A,0,4.09,00.0,00000111,00000000,1110,00.0-00.0,00.0-0.0,4.42,01.02,#"));

        verifyPosition(decoder, text(
                "$rmv,L,868324023777431,27012017,101141,4,2830.2952,N,07705.2532,E,0.0,202.38,225.9,0.86,12,21,VODAFONE - DELH,24,3220,0,4.11,00.0,00000111,00000000,1110,00.0-00.0,00.0-0.0,4.42,01.02,#"));

        verifyPosition(decoder, text(
                "$rnc,H,868324023777431,27012017,101013,4,2830.2923,N,07705.2551,E,0.0,9.65,226.0,0.88,12,21,VODAFONE - DELH,28,3220,0,4.14,07.4,00000111,00000000,1111,00.0-00.0,00.0-0.0,4.42,01.02,#"));

        verifyPosition(decoder, text(
                "$ebl,H,868324023777431,27012017,101046,4,2830.2923,N,07705.2551,E,0.0,9.65,226.0,0.97,11,21,VODAFONE - DELH,25,3220,0,4.11,00.0,00000111,00000000,1110,00.0-00.0,00.0-0.0,4.42,01.02,#"));

        verifyPosition(decoder, text(
                "$nor,L,868324023777431,17012017,001023,4,2830.2977,N,07705.2478,E,0.0,207.07,229.2,0.97,11,22,IDEA CELLULAR L,18,DCDE,0,4.09,12.9,00000111,00000000,1111,00.0-00.0,00.0-0.0,3.59,01.02,#"));

        verifyPosition(decoder, text(
                "$nor,L,868324023777431,17012017,001523,4,2830.2939,N,07705.2527,E,0.0,50.96,236.5,1.05,11,21,IDEA CELLULAR L,18,DCDE,0,4.09,12.8,00000111,00000000,1111,00.0-00.0,00.0-0.0,3.59,01.02,#"));

        verifyPosition(decoder, text(
                "$nor,L,869309999985699,24062015,094459,4,2826.1956,N,07659.7690,E,67.5,2.5,167,0.82,15,22,airtel,31,4441,1,4.1,12.7,00000011,00000011,1111,0.0,0.0,21.3,SW00.01,#"));

    }

}