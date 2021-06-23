import React from 'react';

type Props = {
    progression: number
};

function Progress_bar(props: Props){
    const fixedProgression = Math.round(props.progression * 100).toFixed(0);
    return(
        <div className="progress">
            <div className="progress-bar" role="progressbar" style={{width: fixedProgression + '%'}} aria-valuenow={Number(fixedProgression)} aria-valuemin={0} aria-valuemax={100}>{fixedProgression}%</div>
        </div>
    );
}

export default Progress_bar;