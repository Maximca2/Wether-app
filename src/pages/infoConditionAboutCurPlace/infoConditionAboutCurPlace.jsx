import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchInfoAboutCurInfo } from "../../services/servise";

import style from "../infoConditionAboutCurPlace/infoConditionAboutCurPlace.module.scss";

function filterOnMonth(arr) {
    
  if (!arr) {
    return;
  }
  const data = new Date();
  const curMounth = data.getMonth() + 1;
  const newData = arr.filter((it) =>
    it.datetime.includes(curMounth.toString())
  );

  return newData;
}

function DataDaysisNotDefined(){
    return (
        <div>
            Даних ще немає!
            Виберіть будь ласка кокнкретну локацію щоб побачити темпарутуру!
        </div>
    )
}

const InfoConditionAboutCurPlace = () => {

    
  const dispatch = useDispatch();
  const curcord = useSelector((state) => state.toolkit.curCordinates)
    .slice(-1)
    .pop();
  const curInfoaboutWether = useSelector(
    (state) => state.toolkit.curentWetherInfo
  );
  console.log(curInfoaboutWether);
  const defaultCord = [51.505, -0.09];

  useEffect(() => {
    if (!curcord) {
      return
    }
    dispatch(fetchInfoAboutCurInfo(curcord, defaultCord));
  }, [curcord]);

  return (
    <>
    
      <div className={style.tittle}>Info about Wether on Month</div>
      <div className={style.box}>
        {curInfoaboutWether?.info?.description}
        
        {!curInfoaboutWether?.info?.days
          ? DataDaysisNotDefined()
          : filterOnMonth(curInfoaboutWether?.info?.days).map((it,i) => {
              return (
                <div key={i} className={style.box__content}>
                  <div className={style.description}>
                    На це число {it.datetime}
                  </div>
                  <div className={style.temperature}>
                    Температура максимальна {it.tempmax}
                  </div>
                  <div className={style.temperature}>
                    Температура мінімальна {it.tempmin}
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default InfoConditionAboutCurPlace;
