const ProgressBar = ( {progress} ) => {
  const colors = [
    'rgb(175, 81, 8)',
    'rgb(255, 175, 163)',
    'rgb(175, 94, 94)',
    'rgb(108, 115, 148)'
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  return (
    <div className="outer-bar">
      <div 
        className="inner-bar"
        style={{width: `${progress}%`, backgroundColor: randomColor}}
        ></div>
    </div>
  );
}

export default ProgressBar;