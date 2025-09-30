import React, { useState } from 'react';

const Rating = ({
  value = 0,
  max = 5,
  size = 'md',
  className = '',
  showLabel = false,
  readOnly = false,
  onChange,
  color = 'yellow'
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const colorClasses = {
    yellow: 'text-yellow-400',
    orange: 'text-orange-400',
    red: 'text-red-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400'
  };

  const handleClick = (rating) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  const displayValue = hoverValue || value;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="flex"
        onMouseLeave={() => !readOnly && setHoverValue(0)}
      >
        {[...Array(max)].map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${sizeClasses[size]} ${
              index < displayValue
                ? `${colorClasses[color]}`
                : 'text-gray-300 dark:text-gray-600'
            } ${
              !readOnly ? 'hover:scale-110 cursor-pointer transition-transform' : ''
            }`}
            onClick={() => handleClick(index + 1)}
            onMouseEnter={() => !readOnly && setHoverValue(index + 1)}
            onKeyDown={(e) => {
              if (!readOnly && onChange && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleClick(index + 1);
              }
            }}
            tabIndex={readOnly ? -1 : 0}
            aria-label={`Rate ${index + 1} out of ${max}`}
            disabled={readOnly}
          >
            ★
          </button>
        ))}
      </div>

      {showLabel && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {value > 0 ? `${value.toFixed(1)}/${max}` : 'No ratings'}
        </span>
      )}
    </div>
  );
};

// Rating display component (read-only version)
export const RatingDisplay = ({ value, max = 5, size = 'md', showLabel = true }) => (
  <Rating
    value={value}
    max={max}
    size={size}
    readOnly={true}
    showLabel={showLabel}
  />
);

export default Rating;
