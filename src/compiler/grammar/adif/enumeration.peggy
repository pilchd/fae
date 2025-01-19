ae_ARRL "ADIF enumeration ARRL Section"
  = data:$(
        "AL"
      / "AL"i
      / "AK"i
      / "AB"i
      / "AR"i
      / "AZ"i
      / "BC"i
      / "CO"i
      / "CT"i
      / "DE"i
      / "EB"i
      / "EMA"i
      / "ENY"i
      / "EPA"i
      / "EWA"i
      / "GA"i
      / "GH"i
      / "GTA"i
      / "ID"i
      / "IL"i
      / "IN"i
      / "IA"i
      / "KS"i
      / "KY"i
      / "LAX"i
      / "LA"i
      / "ME"i
      / "MB"i
      / "MAR"i
      / "MDC"i
      / "MI"i
      / "MN"i
      / "MS"i
      / "MO"i
      / "MT"i
      / "NE"i
      / "NV"i
      / "NB"i
      / "NH"i
      / "NM"i
      / "NLI"i
      / "NL"i
      / "NC"i
      / "ND"i
      / "NTX"i
      / "NFL"i
      / "NNJ"i
      / "NNY"i
      / "NT"i
      / "NWT"i
      / "NS"i
      / "OH"i
      / "OK"i
      / "ON"i
      / "ONE"i
      / "ONN"i
      / "ONS"i
      / "ORG"i
      / "OR"i
      / "PAC"i
      / "PE"i
      / "PR"i
      / "QC"i
      / "RI"i
      / "SV"i
      / "SDG"i
      / "SF"i
      / "SJV"i
      / "SB"i
      / "SCV"i
      / "SK"i
      / "SC"i
      / "SD"i
      / "STX"i
      / "SFL"i
      / "SNJ"i
      / "TN"i
      / "TER"i
      / "VI"i
      / "UT"i
      / "VT"i
      / "VA"i
      / "WCF"i
      / "WTX"i
      / "WV"i
      / "WMA"i
      / "WNY"i
      / "WPA"i
      / "WWA"i
      / "WI"i
      / "WY"i
    )
    {
      return data.toUpperCase();
    }

ae_Band "ADIF enumeration Band"
  = data:$(
        "2190m"i
      / "630m"i
      / "560m"i
      / "160m"i
      / "80m"i
      / "60m"i
      / "40m"i
      / "30m"i
      / "20m"i
      / "17m"i
      / "15m"i
      / "12m"i
      / "10m"i
      / "8m"i
      / "6m"i
      / "5m"i
      / "4m"i
      / "2m"i
      / "1.25m"i
      / "70cm"i
      / "33cm"i
      / "23cm"i
      / "13cm"i
      / "9cm"i
      / "6cm"i
      / "3cm"i
      / "1.25cm"i
      / "6mm"i
      / "4mm"i
      / "2.5mm"i
      / "2mm"i
      / "1mm"i
      / "submm"i
    )
    {
      return data.toLowerCase();
    }

ae_Mode "ADIF enumeration Mode"
  = data:$(
        "AM"i
      / "ARDOP"i
      / "ATV"i
      / "CHIP"i
      / "CLO"i
      / "CONTESTI"i
      / "CW"i
      / "DIGITALVOICE"i
      / "DOMINO"i
      / "DYNAMIC"i
      / "FAX"i
      / "FM"i
      / "FSK441"i
      / "FT8"i
      / "HELL"i
      / "ISCAT"i
      / "JT4"i
      / "JT6M"i
      / "JT9"i
      / "JT44"i
      / "JT65"i
      / "MFSK"i
      / "MSK144"i
      / "MT63"i
      / "OLIVIA"i
      / "OPERA"i
      / "PAC"i
      / "PAX"i
      / "PKT"i
      / "PSK"i
      / "PSK2K"i
      / "Q15"i
      / "QRA64"i
      / "ROS"i
      / "RTTY"i
      / "RTTYM"i
      / "SSB"i
      / "SSTV"i
      / "T10"i
      / "THOR"i
      / "THRB"i
      / "TOR"i
      / "V4"i
      / "VOI"i
      / "WINMOR"i
      / "WSPR"i
    )
    {
      return data.toUpperCase();
    }

ae_Submode "ADIF enumeration Submode"
  = data:$(
        "8PSK125"i
      / "8PSK125F"i
      / "8PSK125FL"i
      / "8PSK250"i
      / "8PSK250F"i
      / "8PSK250FL"i
      / "8PSK500"i
      / "8PSK500F"i
      / "8PSK1000"i
      / "8PSK1000F"i
      / "8PSK1200F"i
      / "AMTORFEC"i
      / "ASCI"i
      / "C4FM"i
      / "CHIP64"i
      / "CHIP128"i
      / "DMR"i
      / "DOM-M"i
      / "DOM4"i
      / "DOM5"i
      / "DOM8"i
      / "DOM11"i
      / "DOM16"i
      / "DOM22"i
      / "DOM44"i
      / "DOM88"i
      / "DOMINOEX"i
      / "DOMINOF"i
      / "DSTAR"i
      / "FMHELL"i
      / "FREEDV"i
      / "FSK31"i
      / "FSKHELL"i
      / "FSQCALL"i
      / "FST4"i
      / "FST4W"i
      / "FT4"i
      / "GTOR"i
      / "HELL80"i
      / "HELLX5"i
      / "HELLX9"i
      / "HFSK"i
      / "ISCAT-A"i
      / "ISCAT-B"i
      / "JS8"i
      / "JT4A"i
      / "JT4B"i
      / "JT4C"i
      / "JT4D"i
      / "JT4E"i
      / "JT4F"i
      / "JT4G"i
      / "JT9-1"i
      / "JT9-2"i
      / "JT9-5"i
      / "JT9-10"i
      / "JT9-30"i
      / "JT9A"i
      / "JT9B"i
      / "JT9C"i
      / "JT9D"i
      / "JT9E"i
      / "JT9E FAST"i
      / "JT9F"i
      / "JT9F FAST"i
      / "JT9G"i
      / "JT9G FAST"i
      / "JT9H"i
      / "JT9H FAST"i
      / "JT65A"i
      / "JT65B"i
      / "JT65B2"i
      / "JT65C"i
      / "JT65C2"i
      / "JTMS"i
      / "LSB"i
      / "M17"i
      / "MFSK4"i
      / "MFSK8"i
      / "MFSK11"i
      / "MFSK16"i
      / "MFSK22"i
      / "MFSK31"i
      / "MFSK32"i
      / "MFSK64"i
      / "MFSK64L"i
      / "MFSK128"i
      / "MFSK128L"i
      / "NAVTEX"i
      / "OLIVIA 4/125"i
      / "OLIVIA 4/250"i
      / "OLIVIA 8/250"i
      / "OLIVIA 8/500"i
      / "OLIVIA 16/500"i
      / "OLIVIA 16/1000"i
      / "OLIVIA 32/1000"i
      / "OPERA-BEACON"i
      / "OPERA-QSO"i
      / "PAC2"i
      / "PAC3"i
      / "PAC4"i
      / "PAX2"i
      / "PCW"i
      / "PSK10"i
      / "PSK31"i
      / "PSK63"i
      / "PSK63F"i
      / "PSK63RC10"i
      / "PSK63RC20"i
      / "PSK63RC32"i
      / "PSK63RC4"i
      / "PSK63RC5"i
      / "PSK125"i
      / "PSK125RC10"i
      / "PSK125RC12"i
      / "PSK125RC16"i
      / "PSK125RC4"i
      / "PSK125RC5"i
      / "PSK250"i
      / "PSK250RC2"i
      / "PSK250RC3"i
      / "PSK250RC5"i
      / "PSK250RC6"i
      / "PSK250RC7"i
      / "PSK500"i
      / "PSK500RC2"i
      / "PSK500RC3"i
      / "PSK500RC4"i
      / "PSK800RC2"i
      / "PSK1000"i
      / "PSK1000RC2"i
      / "PSKAM10"i
      / "PSKAM31"i
      / "PSKAM50"i
      / "PSKFEC31"i
      / "PSKHELL"i
      / "QPSK31"i
      / "Q65"i
      / "QPSK63"i
      / "QPSK125"i
      / "QPSK250"i
      / "QPSK500"i
      / "QRA64A"i
      / "QRA64B"i
      / "QRA64C"i
      / "QRA64D"i
      / "QRA64E"i
      / "ROS-EME"i
      / "ROS-HF"i
      / "ROS-MF"i
      / "SIM31"i
      / "SITORB"i
      / "SLOWHELL"i
      / "THOR-M"i
      / "THOR4"i
      / "THOR5"i
      / "THOR8"i
      / "THOR11"i
      / "THOR16"i
      / "THOR22"i
      / "THOR25X4"i
      / "THOR50X1"i
      / "THOR50X2"i
      / "THOR100"i
      / "THRBX"i
      / "THRBX1"i
      / "THRBX2"i
      / "THRBX4"i
      / "THROB1"i
      / "THROB2"i
      / "THROB4"i
      / "USB"i
      / "VARA HF"i
      / "VARA SATELLITE"i
      / "VARA FM 1200"i
      / "VARA FM 9600"i
    )
    {
        return data.toUpperCase();
    }
