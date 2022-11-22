import React from 'react';
import './CreateCharacter.scss'

import { raceArr, raceFullArr, classArr, descrArr } from './testCRArr';
import CreateCharacterRace from './CreateCharacterRace';
import CreateCharacterClass from './CreateCharacterClass';
import { characterClasses, createNewCharacter } from '../../mechanics/CreatingMechanic';
import { useAppDispatch } from '../../store/store';
import { userSlice } from '../../store/reducers/userReducer';
import { sceneSlice } from '../../store/reducers/SceneReducer';

const CreateCharacter = () => {
    const dispath = useAppDispatch()
    const { setPlayerCharacter } = userSlice.actions
    const { setScene } = sceneSlice.actions
    const [fullImg, setFullImg] = React.useState(raceFullArr[0])
    const [description, setDescription] = React.useState(descrArr[0])
    const [reduxClass, setReduxClass] = React.useState(characterClasses[0])
    const [name, setName] = React.useState('')

    const [activeIndex, setActiveIndex] = React.useState(0)

    function switchRace(key: any) {
        setActiveIndex(key)
        setFullImg(raceFullArr[key])
        setDescription(descrArr[key])
        setReduxClass(characterClasses[key])
    }

    const onHandleNameChange = (e: any) => {
        setName(e.target.value)
    }

    const setReduxNewCharacter = (name: string, reduxClass: string) => {
        const newCharacter = createNewCharacter(name, reduxClass)
        const playerCharacter = setPlayerCharacter(newCharacter)
        dispath(playerCharacter)
        dispath(setScene("main"))
        // dispath(setPlayerCharacter(createNewCharacter(name, reduxClass)))
    }

    return (
        <div className='create-character'>
            <div className="create-character__wrapper">
                <div className="create-character__content">

                    <div className="create-character__select">

                        <div className="create-character__select-item">
                            <p className='create-character__select-title'>race</p>

                            <div className="create-character__race">
                                {raceArr.map((item, i) => {
                                    if (activeIndex == i) {
                                        return <CreateCharacterRace key={i} CharacterRace={item} switchRace={() => switchRace(i)} activeClassName={"_active"} />
                                    } else {
                                        return <CreateCharacterRace key={i} CharacterRace={item} switchRace={() => switchRace(i)} activeClassName={""} />
                                    }
                                })}
                            </div>
                        </div>

                        <div className="create-character__select-item">
                            <p className='create-character__select-title'>class</p>

                            <div className="create-character__class">
                                {classArr.map((item, i) => {
                                    return <CreateCharacterClass key={i} CharacterClass={item} />
                                })}
                            </div>
                        </div>


                    </div>

                    <div className="create-character__bigimg">
                        <img src={fullImg} alt="img" />
                    </div>


                    <div className="create-character__info">
                        <p className="create-character__info-title">Information</p>

                        <div className="create-character__info-descr">
                            <p>Description</p>
                            {description}
                        </div>

                        <div className="create-character__info-content">

                            <div className="create-character__info-stats stats">
                                <p className="stats__title">Stats</p>
                                <ul className="stats__lists">
                                    <li className="stats__elem">HP - maxHp</li>
                                    <li className="stats__elem">attak - (min - max)</li>
                                    <li className="stats__elem">armor - armor</li>
                                    <li className="stats__elem">INT - 15</li>
                                    <li className="stats__elem">MEN - 15</li>
                                    <li className="stats__elem">WIT - 15</li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </div>


                <div className="create-character__name">
                    <input
                        type="text"
                        name='name'
                        autoComplete='off'
                        placeholder='CHARACTER NAME'
                        onChange={(e) => onHandleNameChange(e)} />
                </div>

                <button className='create-character__btn' onClick={() => setReduxNewCharacter(name, reduxClass)}>Create</button>

            </div>

        </div>
    );
};

export default CreateCharacter;