import React, { useState, useEffect } from "react"
import krx from "./krx"
import "./App.css"

const now: Date = new Date()
const sid: number = now.getTime()
const codes:any[] = krx.OutBlock_1

function App() {
  const [size, setSize] = useState<{
    viewWidth: number
    viewHeight: number
    colsCount: number
  }>({
    viewWidth: document.documentElement.clientWidth,
    viewHeight: document.documentElement.clientHeight,
    colsCount:
      document.documentElement.clientWidth >= 560
        ? Math.floor((document.documentElement.clientWidth - 10) / 550)
        : 1,
  })

  const [range, setRange] = useState<{
    day1: string
    day90: string
    day365: string
    day1095: string
  }>({
    day1: "none",
    day90: "block",
    day365: "none",
    day1095: "none",
  })
  const changeRange = (days: number) => {
    setRange({
      day1: days === 1 ? "block" : "none",
      day90: days === 90 ? "block" : "none",
      day365: days === 365 ? "block" : "none",
      day1095: days === 1095 ? "block" : "none",
    })
  }

  // 코스피, 코스닥 지수
  const korea: { title: string; code: string }[] = [
    { title: "코스피", code: "KOSPI" },
    { title: "코스닥", code: "KOSDAQ" },
  ]

  // 해외 주식 지수
  const world: { title: string; code: string }[] = [
    { title: "다우산업", code: "DJI@DJI" },
    { title: "나스닥종합", code: "NAS@IXIC" },
    { title: "S&P 500", code: "SPI@SPX" },
    { title: "상해종합", code: "SHS@000001" },
    { title: "항셍", code: "HSI@HSI" },
    { title: "유로스톡스 50", code: "STX@SX5E" },
    { title: "인도 SENSEX", code: "INI@BSE30" },
  ]

  // 시장 지표
  const marketindex: { title: string; code: string; link: string }[] = [
    {
      title: "WTI(서부텍사스유, 달러/배럴)",
      code: "OIL_CL",
      link: "https://finance.naver.com/marketindex/worldOilDetail.naver?marketindexCd=OIL_CL&fdtc=2",
    },
    {
      title: "달런인덱스",
      code: "FX_USDX",
      link: "https://finance.naver.com/marketindex/worldExchangeDetail.naver?marketindexCd=FX_USDX",
    },
    {
      title: "KRW/USD",
      code: "FX_USDKRW",
      link: "https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=FX_USDKRW",
    },
    // {
    //   title: "국제 금",
    //   code: "CMDT_GC",
    //   link: "https://finance.naver.com/marketindex/worldGoldDetail.naver?marketindexCd=CMDT_GC&fdtc=2",
    // },
    {
      title: "CD금리(91일)",
      code: "IRR_CD91",
      link: "https://finance.naver.com/marketindex/interestDetail.naver?marketindexCd=IRR_CD91",
    },
    // {
    //   title: "구리(달러/톤)",
    //   code: "MCDT_CDY",
    //   link: "https://finance.naver.com/marketindex/interestDetail.naver?marketindexCd=IRR_CD91",
    // },
    // {
    //   title: "옥수수(센트/부셀)",
    //   code: "CMDT_C",
    //   link: "https://finance.naver.com/marketindex/materialDetail.naver?marketindexCd=CMDT_C",
    // },
    // {
    //   title: "오렌지주스(센트/파운드)",
    //   code: "CMDT_OJ",
    //   link: "https://finance.naver.com/marketindex/materialDetail.naver?marketindexCd=CMDT_OJ",
    // },
  ]

  const stockG1: { title: string; code: string }[] = [
    { title: "삼성전자", code: "005930" },
    { title: "네이버", code: "035420" },
    { title: "인탑스", code: "049070" },
    { title: "쏘카", code: "403550" },
  ]

  // KB증권
  const stockKB: { title: string; code: string }[] = [
    { title: "코웰패션", code: "033290" },
    { title: "KODEX 유럽탄소배출권선물ICE(H)", code: "400570" },
  ]

  // NH증권
  const stockNH: { title: string; code: string }[] = [
    { title: "SK하이닉스", code: "000660" },
    // { title: "SK텔레콤", code: "017670" },
    { title: "KT&G", code: "033780" },
    { title: "LG전자", code: "066570" },
    // { title: "우리금융지주", code: "316140" },
    // { title: "케이카", code: "381970" },
  ]

  // 삼성증권
  const stockSS: { title: string; code: string }[] = [
    { title: "기아", code: "000270" },
    { title: "삼성전기", code: "009150" },
    { title: "LG유플러스", code: "032640" },
    // { title: "SK", code: "034730" },
    // { title: "신한지주", code: "055550" },
    { title: "TIGER KRX바이오K-뉴딜", code: "364970" },
    { title: "TIGER KRX2차전지K-뉴딜", code: "364980" },
    { title: "TIGER KRX인터넷K-뉴딜", code: "365000" },
  ]

  // 신한투자
  const stockSH: { title: string; code: string }[] = [
    // { title: "TIGER 유로스탁스50(합성H)", code: "195930" },
    // { title: "ARIRANG 신흥국MSCI(합성H)", code: "195980" },
    { title: "TIGER 미국다우존스30", code: "245340" },
    { title: "KODEX 선진국 MSCI World", code: "251350" },
    { title: "KODEX 종합채권(AA-이상)액티브", code: "273130" },
    { title: "KODEX 200미국채혼합", code: "284430" },
    // { title: "KODEX 미국FANG플러스(H)", code: "314250" },
    { title: "KODEX 혁신기술테마액티브", code: "364690" },
    { title: "TIGER AI코리아프로스액티브", code: "365040" },
  ]

  // Eventlistener for hardware
  useEffect(() => {
    window.addEventListener("resize", () => {
      const clientWidth = document.documentElement.clientWidth
      const clientHeight = document.documentElement.clientHeight
      setSize({
        viewWidth: clientWidth,
        viewHeight: clientHeight,
        colsCount:
          clientWidth >= 560 ? Math.floor((clientWidth - 10) / 550) : 1,
      })
    })
  }, [])

  const styles = {
    App: {
      width: `${
        size.viewWidth >= 560 ? size.colsCount * 550 + 10 : size.viewWidth
      }px`,
    },
    Header: {
      width: `${
        size.viewWidth >= 560 ? size.colsCount * 550 - 10 : size.viewWidth - 20
      }px`,
    },
    Charts: {
      gridTemplateColumns: `${
        size.viewWidth >= 560
          ? "repeat(auto-fit, minmax(540px, 1fr))"
          : "repeat(auto-fit, minmax(360px, 1fr))"
      }`,
    },
  }

  return (
    <div className="center">
      <div className="App" style={styles.App}>
        <div className="Logo">Fin Chart</div>
        <div className="Header" style={styles.Header}>
          <div className="range-buttons">
            <button className="range-button" onClick={() => changeRange(1)} style={{fontWeight: `${range.day1 === "block" ? 700 : 400}`}}>
              1D
            </button>
            <button className="range-button" onClick={() => changeRange(90)} style={{fontWeight: `${range.day90 === "block" ? 700 : 400}`}}>
              3M
            </button>
            <button className="range-button" onClick={() => changeRange(365)} style={{fontWeight: `${range.day365 === "block" ? 700 : 400}`}}>
              1Y
            </button>
            <button className="range-button" onClick={() => changeRange(1095)} style={{fontWeight: `${range.day1095 === "block" ? 700 : 400}`}}>
              5Y
            </button>
          </div>
          <div className="group-buttons">
            <a href="#K">
              <div className="group-button">K</div>
            </a>
            <a href="#W">
              <div className="group-button">W</div>
            </a>
            <a href="#I">
              <div className="group-button">I</div>
            </a>
            <a href="#G1">
              <div className="group-button">G1</div>
            </a>
            <a href="#KB">
              <div className="group-button">KB</div>
            </a>
            <a href="#NH">
              <div className="group-button">NH</div>
            </a>
            <a href="#SS">
              <div className="group-button">SS</div>
            </a>
            <a href="#SH">
              <div className="group-button">SH</div>
            </a>
          </div>
        </div>

        <div className="charts" style={styles.Charts}>
          {korea.map((stock, index) => (
            <div key={stock.code} id={index === 0 ? "K" : ""}>
              <a
                href={`https://finance.naver.com/sise/sise_index.naver?code=${stock.code}`}
                target="_blank"
              >
                <div className="title">
                  &nbsp;&nbsp;{stock.title}
                  &nbsp;&nbsp;&nbsp;
                  <span style={{ color: "#9E5CCD",fontSize: "12px" }}>█개인</span>
                  &nbsp;&nbsp;<span style={{ color: "#F48416",fontSize: "12px" }}>█외국인</span>
                  &nbsp;&nbsp;<span style={{ color: "#1193F0",fontSize: "12px" }}>█기관</span>                  
                </div>
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/sise/siseMain${stock.code}.png?sid=${sid}`}
                />
                <img
                  className="by4"
                  src={`https://ssl.pstatic.net/imgstock/chart3/day1095/${stock.code}.png?sid=${sid}`}
                />
                <img
                  className="by4"
                  src={`https://ssl.pstatic.net/imgstock/chart3/day365/${stock.code}.png?sid=${sid}`}
                />
                <img
                  className="by4"
                  src={`https://ssl.pstatic.net/imgstock/chart3/day90/${stock.code}.png?sid=${sid}`}
                />
                <img
                  className="by4"
                  src={`https://ssl.pstatic.net/imgstock/chart3/day/${stock.code}.png?sid=${sid}`}
                />
              </a>
            </div>
          ))}

          {world.map((stock, index) => (
            <div key={stock.code} id={index === 0 ? "W" : ""}>
              <a
                href={`https://finance.naver.com/world/sise.naver?symbol=${stock.code}`}
                target="_blank"
              >
                <div className="title">
                  <span
                    className="group"
                    style={{ backgroundColor: "#d2e7d2" }}
                  >
                    해외지수
                  </span>
                  &nbsp;{stock.title}
                </div>
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/world/continent/${stock.code}.png?${sid}`}
                  onError={(e) => {
                    e.currentTarget.src = `https://ssl.pstatic.net/imgfinance/chart/world/candle/day/${stock.code}.png?${sid}`
                  }}
                  style={{
                    display: `${range.day1}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/world/candle/day/${stock.code}.png?${sid}`}
                  style={{
                    display: `${range.day90}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/world/candle/week/${stock.code}.png?${sid}`}
                  style={{
                    display: `${range.day365}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/world/candle/month/${stock.code}.png?${sid}`}
                  style={{
                    display: `${range.day1095}`,
                  }}
                />
              </a>
            </div>
          ))}

          {marketindex.map((stock, index) => (
            <div key={stock.code} id={index === 0 ? "I" : ""}>
              <a
                href={`https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=${stock.code}`}
                target="_blank"
              >
                <div className="title">
                  <span
                    className="group"
                    style={{ backgroundColor: "#dfc6c6" }}
                  >
                    시장지표
                  </span>
                  &nbsp;{stock.title}
                </div>
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/marketindex/area/month/${stock.code}.png?sidcode=`}
                  style={{
                    display: `${range.day1}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/marketindex/area/month3/${stock.code}.png?sidcode=`}
                  style={{
                    display: `${range.day90}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/marketindex/area/year/${stock.code}.png?sidcode=`}
                  style={{
                    display: `${range.day365}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/marketindex/area/year5/${stock.code}.png?sidcode=`}
                  style={{
                    display: `${range.day1095}`,
                  }}
                />
              </a>
            </div>
          ))}

          {stockG1.map((stock, index) => (
            <div key={stock.code} id="G1">
              <a
                href={`https://finance.naver.com/item/main.naver?code=${stock.code}`}
                target="_blank"
              >
                <div className="title">
                  <span className="group" style={{ backgroundColor: "#ddd" }}>
                    관심1
                  </span>
                  &nbsp;{stock.title}
                </div>
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/area/week/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day1}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/day/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day90}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/week/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day365}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/month/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day1095}`,
                  }}
                />
              </a>
            </div>
          ))}

          {stockKB.map((stock, index) => (
            <div key={stock.code} id="KB">
              <a
                href={`https://finance.naver.com/item/main.naver?code=${stock.code}`}
                target="_blank"
              >
                <div className="title">
                  <span
                    className="group"
                    style={{ backgroundColor: "#ffffbf" }}
                  >
                    KB증권
                  </span>
                  &nbsp;{stock.title}
                </div>
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/area/week/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day1}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/day/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day90}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/week/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day365}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/month/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day1095}`,
                  }}
                />
              </a>
            </div>
          ))}

          {stockNH.map((stock, index) => (
            <div key={stock.code} id="NH">
              <a
                href={`https://finance.naver.com/item/main.naver?code=${stock.code}`}
                target="_blank"
              >
                <div className="title">
                  <span
                    className="group"
                    style={{ backgroundColor: "#e6ffe3" }}
                  >
                    NH증권
                  </span>
                  &nbsp;{stock.title}
                </div>
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/area/week/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day1}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/day/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day90}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/week/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day365}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/month/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day1095}`,
                  }}
                />
              </a>
            </div>
          ))}

          {stockSS.map((stock, index) => (
            <div key={stock.code} id="SS">
              <a
                href={`https://finance.naver.com/item/main.naver?code=${stock.code}`}
                target="_blank"
              >
                <div className="title">
                  <span
                    className="group"
                    style={{ backgroundColor: "#e4f6f8" }}
                  >
                    삼성증권
                  </span>
                  &nbsp;{stock.title}
                </div>
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/area/week/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day1}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/day/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day90}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/week/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day365}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/month/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day1095}`,
                  }}
                />
              </a>
            </div>
          ))}

          {stockSH.map((stock, index) => (
            <div key={stock.code} id="SH">
              <a
                href={`https://finance.naver.com/item/main.naver?code=${stock.code}`}
                target="_blank"
              >
                <div className="title">
                  <span
                    className="group"
                    style={{ backgroundColor: "#e9d3ff" }}
                  >
                    신한증권
                  </span>
                  &nbsp;{stock.title}
                </div>
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/area/week/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day1}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/day/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day90}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/week/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day365}`,
                  }}
                />
                <img
                  src={`https://ssl.pstatic.net/imgfinance/chart/item/candle/month/${stock.code}.png?sidcode=${sid}`}
                  style={{
                    display: `${range.day1095}`,
                  }}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
