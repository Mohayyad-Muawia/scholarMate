type ProgressBarProps = {
  progress: number;
  value: number;
  total: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  value,
  total,
}) => {
  return (
    <div className="progress-bar">
      <div className="bar" style={{ width: `${progress}%` }}>
        {progress != 0 && <span>{progress}%</span>}
      </div>
      <p className="info">
        {value} <span>/</span> {total}
      </p>
    </div>
  );
};
export default ProgressBar;
