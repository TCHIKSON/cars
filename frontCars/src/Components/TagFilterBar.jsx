import React from 'react';
import './Style/TagFilterBar.css';

const TagFilterBar = ({ cars, selectedTags, onTagToggle }) => {
    
    const allTags = [...new Set(cars.flatMap(car => car.tags || []))].sort();

    if (allTags.length === 0) return null;

    return (
        <div className="tag-filter-bar">
            <span className="filter-label">Filtrer par :</span>
            <div className="tags-scroll-container">
                {allTags.map(tag => (
                    <button
                        key={tag}
                        className={`tag-chip ${selectedTags.includes(tag) ? 'active' : ''}`}
                        onClick={() => onTagToggle(tag)}
                    >
                        {tag}
                        {selectedTags.includes(tag) && <span className="chip-close">×</span>}
                    </button>
                ))}
            </div>
            {selectedTags.length > 0 && (
                <button className="clear-tags-btn" onClick={() => onTagToggle('clear-all')}>
                    Réinitialiser
                </button>
            )}
        </div>
    );
};

export default TagFilterBar;