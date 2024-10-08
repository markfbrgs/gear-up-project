import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './bike-builder-upgrader.scss';
import PageLayout from '../../components/page-layout/page-layout';
import frame from "../../assets/images/frame.png";
import fork from "../../assets/images/fork.png";
import groupset from "../../assets/images/groupset.png";
import wheelset from "../../assets/images/wheelset.png";
import seat from "../../assets/images/seat.png";
import cockpit from "../../assets/images/cockpit.png";
import headset from "../../assets/images/headset.png";
import handlebar from "../../assets/images/handlebar.png";
import stem from "../../assets/images/stem.png";
import hub from "../../assets/images/hub.png";
import { getItemCount } from '../../services/bbuService';

const BikeBuilderUpgrader = () => {
    const navigate = useNavigate();
    const [partCounts, setPartCounts] = useState({
        frame: 0,
        fork: 0,
        groupset: 0,
        wheelset: 0,
        seat: 0,
        cockpit: 0,
        headset: 0,
        handlebar: 0,
        stem: 0,
        hubs: 0,
    });

    const handlePartClick = (part) => {
        navigate(`parts/${part}`);
    };

    const fetchPartCounts = async () => {
        const counts = await Promise.all([
            getItemCount('frame'),
            getItemCount('fork'),
            getItemCount('groupset'),
            getItemCount('wheelset'),
            getItemCount('seat'),
            getItemCount('cockpit'),
            getItemCount('headset'),
            getItemCount('handlebar'),
            getItemCount('stem'),
            getItemCount('hubs'),
        ]);

        setPartCounts({
            frame: counts[0].count,
            fork: counts[1].count,
            groupset: counts[2].count,
            wheelset: counts[3].count,
            seat: counts[4].count,
            cockpit: counts[5].count,
            headset: counts[6].count,
            handlebar: counts[7].count,
            stem: counts[8].count,
            hubs: counts[9].count,
        });
    };

    useEffect(() => {
        fetchPartCounts();
    }, []);

    return (
        <div className='bike-builder-upgrader p-3'>
            <PageLayout
                leftContent={
                    <div className='bike-builder-upgrader-container'>
                        <div className='upper-container d-flex'>
                            <div
                                className='frame-container'
                                onClick={() => handlePartClick('frame')}
                            >
                                <div className='content'>
                                    <div className='image'>
                                        <img src={frame} alt='Frame' />
                                    </div>
                                    <div className='part-item-count'>
                                        <div className='part fs-6 fw-bold'>Frame</div>
                                        <div className='item-count fw-light fs-7'>{partCounts.frame} items</div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className='fork-container'
                                onClick={() => handlePartClick('fork')}
                            >
                                <div className='content'>
                                    <div className='image'>
                                        <img src={fork} alt='Fork' />
                                    </div>
                                    <div className='part-item-count'>
                                        <div className='part fs-6 fw-bold'>Fork</div>
                                        <div className='item-count fw-light fs-7'>{partCounts.fork} items</div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className='groupset-container'
                                onClick={() => handlePartClick('groupset')}
                            >
                                <div className='content'>
                                    <div className='image'>
                                        <img src={groupset} alt='Groupset' />
                                    </div>
                                    <div className='part-item-count'>
                                        <div className='part fs-6 fw-bold'>Groupset</div>
                                        <div className='item-count fw-light fs-7'>{partCounts.groupset} items</div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className='wheelset-container'
                                onClick={() => handlePartClick('wheelset')}
                            >
                                <div className='content'>
                                    <div className='image'>
                                        <img src={wheelset} alt='Wheelset' />
                                    </div>
                                    <div className='part-item-count'>
                                        <div className='part fs-6 fw-bold'>Wheelset</div>
                                        <div className='item-count fw-light fs-7'>{partCounts.wheelset} items</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='middle-container d-flex'>
                            <div
                                className='seat-container'
                                onClick={() => handlePartClick('seat')}
                            >
                                <div className='content'>
                                    <div className='image'>
                                        <img src={seat} alt='Seat' />
                                    </div>
                                    <div className='part-item-count'>
                                        <div className='part fs-6 fw-bold'>Seat</div>
                                        <div className='item-count fw-light fs-7'>{partCounts.seat} items</div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className='cockpit-container'
                                onClick={() => handlePartClick('cockpit')}
                            >
                                <div className='content'>
                                    <div className='image'>
                                        <img src={cockpit} alt='Cockpit' />
                                    </div>
                                    <div className='part-item-count'>
                                        <div className='part fs-6 fw-bold'>Cockpit</div>
                                        <div className='item-count fw-light fs-7'>{partCounts.cockpit} items</div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className='headset-container'
                                onClick={() => handlePartClick('headset')}
                            >
                                <div className='content'>
                                    <div className='image'>
                                        <img src={headset} alt='Headset' />
                                    </div>
                                    <div className='part-item-count'>
                                        <div className='part fs-6 fw-bold'>Headset</div>
                                        <div className='item-count fw-light fs-7'>{partCounts.headset} items</div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className='handlebar-container'
                                onClick={() => handlePartClick('handlebar')}
                            >
                                <div className='content'>
                                    <div className='image'>
                                        <img src={handlebar} alt='Handlebar' />
                                    </div>
                                    <div className='part-item-count'>
                                        <div className='part fs-6 fw-bold'>Handlebar</div>
                                        <div className='item-count fw-light fs-7'>{partCounts.handlebar} items</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='lower-container d-flex'>
                            <div
                                className='stem-container'
                                onClick={() => handlePartClick('stem')}
                            >
                                <div className='content'>
                                    <div className='image'>
                                        <img src={stem} alt='Stem' />
                                    </div>
                                    <div className='part-item-count'>
                                        <div className='part fs-6 fw-bold'>Stem</div>
                                        <div className='item-count fw-light fs-7'>{partCounts.stem} items</div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className='hubs-container'
                                onClick={() => handlePartClick('hubs')}
                            >
                                <div className='content'>
                                    <div className='image'>
                                        <img src={hub} alt='Hub' />
                                    </div>
                                    <div className='part-item-count'>
                                        <div className='part fs-6 fw-bold'>Hubs</div>
                                        <div className='item-count fw-light fs-7'>{partCounts.hubs} items</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                rightContent={
                    <div className='description'>
                        Select parts to view details
                    </div>
                }
            />
        </div>
    );
};

export default BikeBuilderUpgrader;
