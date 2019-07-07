import React from 'react';

const ResultSection = (props) => {
  return (
    <div>
      <div className="row">
          Original Data:
          {props.origData.length > 0 ? `[${props.origData}]` : ""}
        </div>
        <div className="row">Mean: {props.stats.mean}</div>
        <div className="row">Median: {props.stats.median}</div>
        <div className="row">Variance: {props.stats.variance}</div>
        <div className="row">Standard Deviation: {props.stats.stddev}</div>
    </div>
  );
};


export default ResultSection;
