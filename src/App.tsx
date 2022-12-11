import React, { useState, useEffect } from "react"
import krxStock from "./krxStock"
import krxETF from "./krxETF"
import "./App.css"

const now: Date = new Date()
const sid: number = now.getTime()
const codes: any[] = [...krxStock.OutBlock_1, ...krxETF.output]

function App() {
  const [editmode, setEditmode] = useState(false)

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

  // const stocksJace: {
  //   groupTitle: string
  //   codes: { title: string; code: string }[]
  //   color: string
  // }[] = [
  //   {
  //     groupTitle: "관심1",
  //     codes: [
  //       { title: "삼성전자", code: "005930" },
  //       { title: "네이버", code: "035420" },
  //       { title: "인탑스", code: "049070" },
  //       { title: "쏘카", code: "403550" },
  //       { title: "쏘카", code: "211900" },
  //     ],
  //     color: "#ddd",
  //   },
  //   {
  //     groupTitle: "KB증권",
  //     codes: [
  //       { title: "코웰패션", code: "033290" },
  //       { title: "KODEX 유럽탄소배출권선물ICE(H)", code: "400570" },
  //     ],
  //     color: "#ffffbf",
  //   },
  //   {
  //     groupTitle: "NH증권",
  //     codes: [
  //       { title: "SK하이닉스", code: "000660" },
  //       { title: "KT&G", code: "033780" },
  //       { title: "LG전자", code: "066570" },
  //     ],
  //     color: "#e6ffe3",
  //   },
  //   {
  //     groupTitle: "삼성증권",
  //     codes: [
  //       { title: "기아", code: "000270" },
  //       { title: "삼성전기", code: "009150" },
  //       { title: "LG유플러스", code: "032640" },
  //       { title: "TIGER KRX바이오K-뉴딜", code: "364970" },
  //       { title: "TIGER KRX2차전지K-뉴딜", code: "364980" },
  //       { title: "TIGER KRX인터넷K-뉴딜", code: "365000" },
  //     ],
  //     color: "#e4f6f8",
  //   },
  //   {
  //     groupTitle: "신한증권",
  //     codes: [
  //       { title: "TIGER 미국다우존스30", code: "245340" },
  //       { title: "KODEX 선진국 MSCI World", code: "251350" },
  //       { title: "KODEX 종합채권(AA-이상)액티브", code: "273130" },
  //       { title: "KODEX 200미국채혼합", code: "284430" },
  //       { title: "KODEX 혁신기술테마액티브", code: "364690" },
  //       { title: "TIGER AI코리아프로스액티브", code: "365040" },
  //     ],
  //     color: "#e9d3ff",
  //   },
  //   // { groupTitle: "test", codes: [{ title: "", code: "245340"}], color: "#f00" },
  // ]
  const stocksJace: {
    groupTitle: string
    codes: { title: string; code: string }[]
    color: string
  }[] = [
    {
      groupTitle: "관심1",
      codes: [
        { title: "삼성전자", code: "005930" },
        { title: "네이버", code: "035420" },
        { title: "인탑스", code: "049070" },
        { title: "쏘카", code: "403550" },
      ],
      color: "#ddd",
    },
    {
      groupTitle: "KB증권",
      codes: [
        { title: "코웰패션", code: "033290" },
        { title: "KODEX 유럽탄소배출권선물ICE(H)", code: "400570" },
      ],
      color: "#ffffbf",
    },
    {
      groupTitle: "NH증권",
      codes: [
        { title: "SK하이닉스", code: "000660" },
        { title: "KT&G", code: "033780" },
        { title: "LG전자", code: "066570" },
      ],
      color: "#e6ffe3",
    },
    {
      groupTitle: "삼성증권",
      codes: [
        { title: "기아", code: "000270" },
        { title: "삼성전기", code: "009150" },
        { title: "LG유플러스", code: "032640" },
        { title: "TIGER KRX바이오K-뉴딜", code: "364970" },
        { title: "TIGER KRX2차전지K-뉴딜", code: "364980" },
        { title: "TIGER KRX인터넷K-뉴딜", code: "365000" },
      ],
      color: "#e4f6f8",
    },
    {
      groupTitle: "신한증권",
      codes: [
        { title: "TIGER 미국다우존스30", code: "245340" },
        { title: "KODEX 선진국 MSCI World", code: "251350" },
        { title: "KODEX 종합채권(AA-이상)액티브", code: "273130" },
        { title: "KODEX 200미국채혼합", code: "284430" },
        { title: "KODEX 혁신기술테마액티브", code: "364690" },
        { title: "TIGER AI코리아프로스액티브", code: "365040" },
      ],
      color: "#e9d3ff",
    },
    // { groupTitle: "test", codes: [{ title: "", code: "245340"}], color: "#f00" },
  ]
  const [stocks, setStocks] = useState(stocksJace)
  const codeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newStocks = [...stocks]
    const {
      currentTarget: { name, value },
    } = event
    if (name.length === 2) {
      const groupOrder = parseInt(name[1])
      newStocks[groupOrder].groupTitle = value
      setStocks([...newStocks])
    }
    if (name.length > 2) {
      const groupOrder = parseInt(name[1])
      const stockOrder = parseInt(name.slice(3))
      newStocks[groupOrder].codes[stockOrder] = {
        title: findStock(value)?.ISU_ABBRV,
        code: value,
      }
      setStocks([...newStocks])
    }
  }

  const findStock = (code: string) =>
    codes.find((stock) => stock.ISU_SRT_CD === code)
  const findStockName = (grp: number, idx: number) =>
    findStock(stocks[grp]?.codes[idx]?.code)?.ISU_ABBRV

  // Eventlistener for hardware
  useEffect(() => {
    const stocksFromStorage = window.localStorage.getItem("stocks")
    if (stocksFromStorage) {
      setStocks([...JSON.parse(stocksFromStorage)])
    } else {
      window.localStorage.setItem("stocks", JSON.stringify(stocks))
    }
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
        <div className="Logo" onClick={() => setEditmode(true)}>
          Fin Chart
        </div>
        <div className="Header" style={styles.Header}>
          <div className="range-buttons">
            <button
              className="range-button"
              onClick={() => changeRange(1)}
              style={{ fontWeight: `${range.day1 === "block" ? 700 : 400}` }}
            >
              1D
            </button>
            <button
              className="range-button"
              onClick={() => changeRange(90)}
              style={{ fontWeight: `${range.day90 === "block" ? 700 : 400}` }}
            >
              3M
            </button>
            <button
              className="range-button"
              onClick={() => changeRange(365)}
              style={{ fontWeight: `${range.day365 === "block" ? 700 : 400}` }}
            >
              1Y
            </button>
            <button
              className="range-button"
              onClick={() => changeRange(1095)}
              style={{ fontWeight: `${range.day1095 === "block" ? 700 : 400}` }}
            >
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
                  <span style={{ color: "#9E5CCD", fontSize: "12px" }}>
                    █개인
                  </span>
                  &nbsp;&nbsp;
                  <span style={{ color: "#F48416", fontSize: "12px" }}>
                    █외국인
                  </span>
                  &nbsp;&nbsp;
                  <span style={{ color: "#1193F0", fontSize: "12px" }}>
                    █기관
                  </span>
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
                  &nbsp;{stock.title}&nbsp;
                  {range.day1 !== "block" && (
                    <span className="candle">
                      {range.day90 === "block" ? "일봉·" : null}
                      {range.day365 === "block" ? "주봉:" : null}
                      {range.day1095 === "block" ? "월봉⋮" : null}
                    </span>
                  )}
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

          {stocks.map((group, groupIndex) =>
            group.codes.map((stock, stockIndex) => {
              if (findStock(stock.code)?.ISU_ABBRV)
                return (
                  <div key={`g${groupIndex}s${stockIndex}`} id="SH">
                    <a
                      href={`https://finance.naver.com/item/main.naver?code=${stock.code}`}
                      target="_blank"
                    >
                      <div className="title">
                        <span
                          className="group"
                          style={{ backgroundColor: group.color }}
                        >
                          {group.groupTitle}
                        </span>
                        &nbsp;{findStock(stock.code)?.ISU_ABBRV}&nbsp;
                        {range.day1 !== "block" && (
                          <span className="candle">
                            {range.day90 === "block" ? "일봉·" : null}
                            {range.day365 === "block" ? "주봉:" : null}
                            {range.day1095 === "block" ? "월봉⋮" : null}
                          </span>
                        )}
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
                )
            })
          )}
        </div>

        <form
          className="form-box"
          style={{
            width: `${
              size.viewWidth >= 560
                ? size.colsCount * 550 - 10
                : size.viewWidth - 20
            }px`,
            display: `${editmode ? "block" : "none"}`,
          }}
        >
          <button
            className="form-button"
            onClick={() => {
              window.localStorage.setItem("stocks", JSON.stringify(stocks))
              setEditmode(false)
            }}
          >
            수정
          </button>
          <div className="form-description">신규 종목은 최소 1주일 후 등록가능합니다</div>
          <div className="data-form">
            <div className="form-group">
              <input
                id="g0"
                name="g0"
                type="text"
                placeholder="그룹이름"
                value={stocks[0]?.groupTitle}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0">&nbsp;←그룹이름</label>
              <input
                id="g0s0"
                name="g0s0"
                type="text"
                placeholder="종목코드"
                value={stocks[0]?.codes[0]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0s0">
                &nbsp;{findStockName(0, 0) ? findStockName(0, 0) : null}
              </label>
              <input
                id="g0s1"
                name="g0s1"
                type="text"
                placeholder="종목코드"
                value={stocks[0]?.codes[1]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0s1">
                &nbsp;{findStockName(0, 1) ? findStockName(0, 1) : null}
              </label>
              <input
                id="g0s2"
                name="g0s2"
                type="text"
                placeholder="종목코드"
                value={stocks[0]?.codes[2]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0s2">
                &nbsp;{findStockName(0, 2) ? findStockName(0, 2) : null}
              </label>
              <input
                id="g0s3"
                name="g0s3"
                type="text"
                placeholder="종목코드"
                value={stocks[0]?.codes[3]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0s3">
                &nbsp;{findStockName(0, 3) ? findStockName(0, 3) : null}
              </label>
              <input
                id="g0s4"
                name="g0s4"
                type="text"
                placeholder="종목코드"
                value={stocks[0]?.codes[4]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0s4">
                &nbsp;{findStockName(0, 4) ? findStockName(0, 4) : null}
              </label>
              <input
                id="g0s5"
                name="g0s5"
                type="text"
                placeholder="종목코드"
                value={stocks[0]?.codes[5]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0s5">
                &nbsp;{findStockName(0, 5) ? findStockName(0, 5) : null}
              </label>
              <input
                id="g0s6"
                name="g0s6"
                type="text"
                placeholder="종목코드"
                value={stocks[0]?.codes[6]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0s6">
                &nbsp;{findStockName(0, 6) ? findStockName(0, 6) : null}
              </label>
              <input
                id="g0s7"
                name="g0s7"
                type="text"
                placeholder="종목코드"
                value={stocks[0]?.codes[7]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0s7">
                &nbsp;{findStockName(0, 7) ? findStockName(0, 7) : null}
              </label>
              <input
                id="g0s8"
                name="g0s8"
                type="text"
                placeholder="종목코드"
                value={stocks[0]?.codes[8]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0s8">
                &nbsp;{findStockName(0, 8) ? findStockName(0, 8) : null}
              </label>
              <input
                id="g0s9"
                name="g0s9"
                type="text"
                placeholder="종목코드"
                value={stocks[0]?.codes[9]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0s9">
                &nbsp;{findStockName(0, 9) ? findStockName(0, 9) : null}
              </label>
              <input
                id="g0s10"
                name="g0s10"
                type="text"
                placeholder="종목코드"
                value={stocks[0]?.codes[10]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0s10">
                &nbsp;{findStockName(0, 10) ? findStockName(0, 10) : null}
              </label>
              <input
                id="g0s11"
                name="g0s11"
                type="text"
                placeholder="종목코드"
                value={stocks[0]?.codes[11]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g0s11">
                &nbsp;{findStockName(0, 11) ? findStockName(0, 11) : null}
              </label>
            </div>
            <div className="form-group">
              <input
                id="g1"
                name="g1"
                type="text"
                placeholder="그룹이름"
                value={stocks[1]?.groupTitle}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1">&nbsp;←그룹이름</label>
              <input
                id="g1s0"
                name="g1s0"
                type="text"
                placeholder="종목코드"
                value={stocks[1]?.codes[0]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1s0">
                &nbsp;{findStockName(1, 0) ? findStockName(1, 0) : null}
              </label>
              <input
                id="g1s1"
                name="g1s1"
                type="text"
                placeholder="종목코드"
                value={stocks[1]?.codes[1]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1s1">
                &nbsp;{findStockName(1, 1) ? findStockName(1, 1) : null}
              </label>
              <input
                id="g1s2"
                name="g1s2"
                type="text"
                placeholder="종목코드"
                value={stocks[1]?.codes[2]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1s2">
                &nbsp;{findStockName(1, 2) ? findStockName(1, 2) : null}
              </label>
              <input
                id="g1s3"
                name="g1s3"
                type="text"
                placeholder="종목코드"
                value={stocks[1]?.codes[3]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1s3">
                &nbsp;{findStockName(1, 3) ? findStockName(1, 3) : null}
              </label>
              <input
                id="g1s4"
                name="g1s4"
                type="text"
                placeholder="종목코드"
                value={stocks[1]?.codes[4]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1s4">
                &nbsp;{findStockName(1, 4) ? findStockName(1, 4) : null}
              </label>
              <input
                id="g1s5"
                name="g1s5"
                type="text"
                placeholder="종목코드"
                value={stocks[1]?.codes[5]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1s5">
                &nbsp;{findStockName(1, 5) ? findStockName(1, 5) : null}
              </label>
              <input
                id="g1s6"
                name="g1s6"
                type="text"
                placeholder="종목코드"
                value={stocks[1]?.codes[6]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1s6">
                &nbsp;{findStockName(1, 6) ? findStockName(1, 6) : null}
              </label>
              <input
                id="g1s7"
                name="g1s7"
                type="text"
                placeholder="종목코드"
                value={stocks[1]?.codes[7]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1s7">
                &nbsp;{findStockName(1, 7) ? findStockName(1, 7) : null}
              </label>
              <input
                id="g1s8"
                name="g1s8"
                type="text"
                placeholder="종목코드"
                value={stocks[1]?.codes[8]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1s8">
                &nbsp;{findStockName(1, 8) ? findStockName(1, 8) : null}
              </label>
              <input
                id="g1s9"
                name="g1s9"
                type="text"
                placeholder="종목코드"
                value={stocks[1]?.codes[9]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1s9">
                &nbsp;{findStockName(1, 9) ? findStockName(1, 9) : null}
              </label>
              <input
                id="g1s10"
                name="g1s10"
                type="text"
                placeholder="종목코드"
                value={stocks[1]?.codes[10]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1s10">
                &nbsp;{findStockName(1, 10) ? findStockName(1, 10) : null}
              </label>
              <input
                id="g1s11"
                name="g1s11"
                type="text"
                placeholder="종목코드"
                value={stocks[1]?.codes[11]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g1s11">
                &nbsp;{findStockName(1, 11) ? findStockName(1, 11) : null}
              </label>
            </div>
            <div className="form-group">
              <input
                id="g2"
                name="g2"
                type="text"
                placeholder="그룹이름"
                value={stocks[2]?.groupTitle}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2">&nbsp;←그룹이름</label>
              <input
                id="g2s0"
                name="g2s0"
                type="text"
                placeholder="종목코드"
                value={stocks[2]?.codes[0]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2s0">
                &nbsp;{findStockName(2, 0) ? findStockName(2, 0) : null}
              </label>
              <input
                id="g2s1"
                name="g2s1"
                type="text"
                placeholder="종목코드"
                value={stocks[2]?.codes[1]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2s1">
                &nbsp;{findStockName(2, 1) ? findStockName(2, 1) : null}
              </label>
              <input
                id="g2s2"
                name="g2s2"
                type="text"
                placeholder="종목코드"
                value={stocks[2]?.codes[2]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2s2">
                &nbsp;{findStockName(2, 2) ? findStockName(2, 2) : null}
              </label>
              <input
                id="g2s3"
                name="g2s3"
                type="text"
                placeholder="종목코드"
                value={stocks[2]?.codes[3]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2s3">
                &nbsp;{findStockName(2, 3) ? findStockName(2, 3) : null}
              </label>
              <input
                id="g2s4"
                name="g2s4"
                type="text"
                placeholder="종목코드"
                value={stocks[2]?.codes[4]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2s4">
                &nbsp;{findStockName(2, 4) ? findStockName(2, 4) : null}
              </label>
              <input
                id="g2s5"
                name="g2s5"
                type="text"
                placeholder="종목코드"
                value={stocks[2]?.codes[5]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2s5">
                &nbsp;{findStockName(2, 5) ? findStockName(2, 5) : null}
              </label>
              <input
                id="g2s6"
                name="g2s6"
                type="text"
                placeholder="종목코드"
                value={stocks[2]?.codes[6]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2s6">
                &nbsp;{findStockName(2, 6) ? findStockName(2, 6) : null}
              </label>
              <input
                id="g2s7"
                name="g2s7"
                type="text"
                placeholder="종목코드"
                value={stocks[2]?.codes[7]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2s7">
                &nbsp;{findStockName(2, 7) ? findStockName(2, 7) : null}
              </label>
              <input
                id="g2s8"
                name="g2s8"
                type="text"
                placeholder="종목코드"
                value={stocks[2]?.codes[8]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2s8">
                &nbsp;{findStockName(2, 8) ? findStockName(2, 8) : null}
              </label>
              <input
                id="g2s9"
                name="g2s9"
                type="text"
                placeholder="종목코드"
                value={stocks[2]?.codes[9]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2s9">
                &nbsp;{findStockName(2, 9) ? findStockName(2, 9) : null}
              </label>
              <input
                id="g2s10"
                name="g2s10"
                type="text"
                placeholder="종목코드"
                value={stocks[2]?.codes[10]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2s10">
                &nbsp;{findStockName(2, 10) ? findStockName(2, 10) : null}
              </label>
              <input
                id="g2s11"
                name="g2s11"
                type="text"
                placeholder="종목코드"
                value={stocks[2]?.codes[11]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g2s11">
                &nbsp;{findStockName(2, 11) ? findStockName(2, 11) : null}
              </label>
            </div>
            <div className="form-group">
              <input
                id="g3"
                name="g3"
                type="text"
                placeholder="그룹이름"
                value={stocks[3]?.groupTitle}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3">&nbsp;←그룹이름</label>
              <input
                id="g3s0"
                name="g3s0"
                type="text"
                placeholder="종목코드"
                value={stocks[3]?.codes[0]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3s0">
                &nbsp;{findStockName(3, 0) ? findStockName(3, 0) : null}
              </label>
              <input
                id="g3s1"
                name="g3s1"
                type="text"
                placeholder="종목코드"
                value={stocks[3]?.codes[1]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3s1">
                &nbsp;{findStockName(3, 1) ? findStockName(3, 1) : null}
              </label>
              <input
                id="g3s2"
                name="g3s2"
                type="text"
                placeholder="종목코드"
                value={stocks[3]?.codes[2]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3s2">
                &nbsp;{findStockName(3, 2) ? findStockName(3, 2) : null}
              </label>
              <input
                id="g3s3"
                name="g3s3"
                type="text"
                placeholder="종목코드"
                value={stocks[3]?.codes[3]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3s3">
                &nbsp;{findStockName(3, 3) ? findStockName(3, 3) : null}
              </label>
              <input
                id="g3s4"
                name="g3s4"
                type="text"
                placeholder="종목코드"
                value={stocks[3]?.codes[4]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3s4">
                &nbsp;{findStockName(3, 4) ? findStockName(3, 4) : null}
              </label>
              <input
                id="g3s5"
                name="g3s5"
                type="text"
                placeholder="종목코드"
                value={stocks[3]?.codes[5]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3s5">
                &nbsp;{findStockName(3, 5) ? findStockName(3, 5) : null}
              </label>
              <input
                id="g3s6"
                name="g3s6"
                type="text"
                placeholder="종목코드"
                value={stocks[3]?.codes[6]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3s6">
                &nbsp;{findStockName(3, 6) ? findStockName(3, 6) : null}
              </label>
              <input
                id="g3s7"
                name="g3s7"
                type="text"
                placeholder="종목코드"
                value={stocks[3]?.codes[7]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3s7">
                &nbsp;{findStockName(3, 7) ? findStockName(3, 7) : null}
              </label>
              <input
                id="g3s8"
                name="g3s8"
                type="text"
                placeholder="종목코드"
                value={stocks[3]?.codes[8]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3s8">
                &nbsp;{findStockName(3, 8) ? findStockName(3, 8) : null}
              </label>
              <input
                id="g3s9"
                name="g3s9"
                type="text"
                placeholder="종목코드"
                value={stocks[3]?.codes[9]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3s9">
                &nbsp;{findStockName(3, 9) ? findStockName(3, 9) : null}
              </label>
              <input
                id="g3s10"
                name="g3s10"
                type="text"
                placeholder="종목코드"
                value={stocks[3]?.codes[10]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3s10">
                &nbsp;{findStockName(3, 10) ? findStockName(3, 10) : null}
              </label>
              <input
                id="g3s11"
                name="g3s11"
                type="text"
                placeholder="종목코드"
                value={stocks[3]?.codes[11]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g3s11">
                &nbsp;{findStockName(3, 11) ? findStockName(3, 11) : null}
              </label>
            </div>
            <div className="form-group">
              <input
                id="g4"
                name="g4"
                type="text"
                placeholder="그룹이름"
                value={stocks[4]?.groupTitle}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4">&nbsp;←그룹이름</label>
              <input
                id="g4s0"
                name="g4s0"
                type="text"
                placeholder="종목코드"
                value={stocks[4]?.codes[0]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4s0">
                &nbsp;{findStockName(4, 0) ? findStockName(4, 0) : null}
              </label>
              <input
                id="g4s1"
                name="g4s1"
                type="text"
                placeholder="종목코드"
                value={stocks[4]?.codes[1]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4s1">
                &nbsp;{findStockName(4, 1) ? findStockName(4, 1) : null}
              </label>
              <input
                id="g4s2"
                name="g4s2"
                type="text"
                placeholder="종목코드"
                value={stocks[4]?.codes[2]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4s2">
                &nbsp;{findStockName(4, 2) ? findStockName(4, 2) : null}
              </label>
              <input
                id="g4s3"
                name="g4s3"
                type="text"
                placeholder="종목코드"
                value={stocks[4]?.codes[3]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4s3">
                &nbsp;{findStockName(4, 3) ? findStockName(4, 3) : null}
              </label>
              <input
                id="g4s4"
                name="g4s4"
                type="text"
                placeholder="종목코드"
                value={stocks[4]?.codes[4]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4s4">
                &nbsp;{findStockName(4, 4) ? findStockName(4, 4) : null}
              </label>
              <input
                id="g4s5"
                name="g4s5"
                type="text"
                placeholder="종목코드"
                value={stocks[4]?.codes[5]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4s5">
                &nbsp;{findStockName(4, 5) ? findStockName(4, 5) : null}
              </label>
              <input
                id="g4s6"
                name="g4s6"
                type="text"
                placeholder="종목코드"
                value={stocks[4]?.codes[6]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4s6">
                &nbsp;{findStockName(4, 6) ? findStockName(4, 6) : null}
              </label>
              <input
                id="g4s7"
                name="g4s7"
                type="text"
                placeholder="종목코드"
                value={stocks[4]?.codes[7]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4s7">
                &nbsp;{findStockName(4, 7) ? findStockName(4, 7) : null}
              </label>
              <input
                id="g4s8"
                name="g4s8"
                type="text"
                placeholder="종목코드"
                value={stocks[4]?.codes[8]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4s8">
                &nbsp;{findStockName(4, 8) ? findStockName(4, 8) : null}
              </label>
              <input
                id="g4s9"
                name="g4s9"
                type="text"
                placeholder="종목코드"
                value={stocks[4]?.codes[9]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4s9">
                &nbsp;{findStockName(4, 9) ? findStockName(4, 9) : null}
              </label>
              <input
                id="g4s10"
                name="g4s10"
                type="text"
                placeholder="종목코드"
                value={stocks[4]?.codes[10]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4s10">
                &nbsp;{findStockName(4, 10) ? findStockName(4, 10) : null}
              </label>
              <input
                id="g4s11"
                name="g4s11"
                type="text"
                placeholder="종목코드"
                value={stocks[4]?.codes[11]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g4s11">
                &nbsp;{findStockName(4, 11) ? findStockName(4, 11) : null}
              </label>
            </div>
            <div className="form-group">
              <input
                id="g5"
                name="g5"
                type="text"
                placeholder="그룹이름"
                value={stocks[5]?.groupTitle}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5">&nbsp;←그룹이름</label>
              <input
                id="g5s0"
                name="g5s0"
                type="text"
                placeholder="종목코드"
                value={stocks[5]?.codes[0]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5s0">
                &nbsp;{findStockName(5, 0) ? findStockName(5, 0) : null}
              </label>
              <input
                id="g5s1"
                name="g5s1"
                type="text"
                placeholder="종목코드"
                value={stocks[5]?.codes[1]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5s1">
                &nbsp;{findStockName(5, 1) ? findStockName(5, 1) : null}
              </label>
              <input
                id="g5s2"
                name="g5s2"
                type="text"
                placeholder="종목코드"
                value={stocks[5]?.codes[2]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5s2">
                &nbsp;{findStockName(5, 2) ? findStockName(5, 2) : null}
              </label>
              <input
                id="g5s3"
                name="g5s3"
                type="text"
                placeholder="종목코드"
                value={stocks[5]?.codes[3]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5s3">
                &nbsp;{findStockName(5, 3) ? findStockName(5, 3) : null}
              </label>
              <input
                id="g5s4"
                name="g5s4"
                type="text"
                placeholder="종목코드"
                value={stocks[5]?.codes[4]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5s4">
                &nbsp;{findStockName(5, 4) ? findStockName(5, 4) : null}
              </label>
              <input
                id="g5s5"
                name="g5s5"
                type="text"
                placeholder="종목코드"
                value={stocks[5]?.codes[5]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5s5">
                &nbsp;{findStockName(5, 5) ? findStockName(5, 5) : null}
              </label>
              <input
                id="g5s6"
                name="g5s6"
                type="text"
                placeholder="종목코드"
                value={stocks[5]?.codes[6]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5s6">
                &nbsp;{findStockName(5, 6) ? findStockName(5, 6) : null}
              </label>
              <input
                id="g5s7"
                name="g5s7"
                type="text"
                placeholder="종목코드"
                value={stocks[5]?.codes[7]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5s7">
                &nbsp;{findStockName(5, 7) ? findStockName(5, 7) : null}
              </label>
              <input
                id="g5s8"
                name="g5s8"
                type="text"
                placeholder="종목코드"
                value={stocks[5]?.codes[8]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5s8">
                &nbsp;{findStockName(5, 8) ? findStockName(5, 8) : null}
              </label>
              <input
                id="g5s9"
                name="g5s9"
                type="text"
                placeholder="종목코드"
                value={stocks[5]?.codes[9]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5s9">
                &nbsp;{findStockName(5, 9) ? findStockName(5, 9) : null}
              </label>
              <input
                id="g5s10"
                name="g5s10"
                type="text"
                placeholder="종목코드"
                value={stocks[5]?.codes[10]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5s10">
                &nbsp;{findStockName(5, 10) ? findStockName(5, 10) : null}
              </label>
              <input
                id="g5s11"
                name="g5s11"
                type="text"
                placeholder="종목코드"
                value={stocks[5]?.codes[11]?.code}
                onChange={codeChange}
              ></input>
              <label htmlFor="g5s11">
                &nbsp;{findStockName(5, 11) ? findStockName(5, 11) : null}
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
