import React from 'react';
import useStore from '../../store/useStore';
import Icon from './Icon';

const MissionLog = () => {
    const { missionNews, isroMissions } = useStore();

    return (
        <div className="hud-panel overflow-hidden flex flex-col h-full max-h-[300px]">
            <div className="hud-panel-header flex items-center gap-2">
                <Icon name="rss" size={16} />
                <span>Mission Updates</span>
            </div>

            <div className="overflow-y-auto custom-scrollbar flex-1 pr-2">
                {/* ISRO Section */}
                <div className="mb-4">
                    <h5 className="text-xs font-bold text-gold-glow mb-2 uppercase tracking-wider border-b border-gold-glow/20 pb-1">ISRO Highlights</h5>
                    {isroMissions.map((mission, idx) => (
                        <div key={`isro-${idx}`} className="mission-item border-l-gold-glow">
                            <div className="flex justify-between items-start">
                                <span className="mission-title text-gold-glow">{mission.name}</span>
                                <span className="mission-timestamp">{mission.launched.split(' ')[0]}</span>
                            </div>
                            <p className="text-xs text-gray-300 mt-1 line-clamp-2">{mission.description}</p>
                        </div>
                    ))}
                </div>

                {/* General News Section */}
                <div>
                    <h5 className="text-xs font-bold text-cyan-glow mb-2 uppercase tracking-wider border-b border-cyan-glow/20 pb-1">Global Feed</h5>
                    {missionNews.map((news) => (
                        <div key={news.id} className="mission-item border-l-cyan-glow">
                            <div className="flex justify-between items-start">
                                <span className="mission-title">{news.title}</span>
                                <span className="mission-timestamp">{news.date}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] bg-white/10 px-1 rounded text-white/70">{news.agency}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MissionLog;
