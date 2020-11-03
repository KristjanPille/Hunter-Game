import React, {useCallback, useEffect, useState} from "react";
import {HunterBaseApi} from "../../services/HunterBaseApi";
import {ShopBuildingsApi} from "../../services/ShopBuildingsApi";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {green} from "@material-ui/core/colors";
import {BuildingsApi} from "../../services/BuildingsApi";
import SvgIcon, {SvgIconProps} from "@material-ui/core/SvgIcon";

function HunterStore({ parentBuildings, parentHunterBase, hunterBaseChange, buildingsChange }) {

    const [shopBuildings, setShopBuildings] = useState([]);

    useEffect(() => {
        const callApi = async () => {
            const shopBuildings = await ShopBuildingsApi.getAll();
            setShopBuildings(shopBuildings);
        };
        callApi();
    }, [1]);

    const handleHunterBase = useCallback((hunterBaseShallowCopy) => {
        hunterBaseChange(hunterBaseShallowCopy);
    }, []);

    const handleBuildings= useCallback((parentBuildings) => {
        buildingsChange(parentBuildings);
    }, []);

    async function BuyBuilding(shopBuilding) {

        let newBuilding =  {
            appUserId: parentHunterBase.appUserId,
            nameOfBuilding: shopBuilding.nameOfBuilding,
            maxHealth: shopBuilding.maxHealth,
            levelOfBuilding: 1,
            buildingType: shopBuilding.buildingType,
            hunterBaseId: parentHunterBase.id,
        };

        parentHunterBase.coins = parentHunterBase.coins - shopBuilding.price;

        parentBuildings.push(newBuilding);

        await BuildingsApi.create(newBuilding).then(async r =>
            await HunterBaseApi.update(parentHunterBase),
            // After changes have been made to DataBase change view for user, prevention of false cases/connection drops.
            handleHunterBase(parentHunterBase),
            handleBuildings(parentBuildings)
        );
    }

    function HomeIcon(props) {
        return (
            <SvgIcon {...props}>
                <path d="M7,10L12,15L17,10H7Z" />
            </SvgIcon>
        );
    }

    const BuildingsRow = (props) => (
        <tr>
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <Button style={{color: "#E41C1C", fontWeight: "bold"}} {...bindTrigger(popupState)}>
                            {props.building.nameOfBuilding}
                            <HomeIcon style={{color: green[500]}}/>
                        </Button>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Box p={4} style={{backgroundColor: "#99aab5"}}>
                                <Typography><b>Health:</b> {props.building.maxHealth}</Typography>
                                {props.building.attackDamage != undefined &&
                                <Typography><b>Attack:</b> {props.building.attackDamage}</Typography>
                                }
                                {props.building.rangeOfBuilding != undefined &&
                                <Typography><b>Range:</b> {props.building.rangeOfBuilding}</Typography>
                                }
                                <Typography><b>Price:</b> <b
                                    style={{color: "blue"}}>{props.building.price} Coins</b></Typography>
                                <button onClick={(evt) => BuyBuilding(props.building)}>
                                    Buy
                                </button>
                            </Box>
                        </Popover>
                    </div>
                )}
            </PopupState>
        </tr>
    );


    return (
        <>
            <table className="table table-responsive-md table-borderless" style={{
                color: "red",
                backgroundColor: "black",
                maxWidth: "200px",
                borderRadius: "25px",
                marginLeft: "5px"
            }}>
                <thead>
                <tr>
                    <th style={{fontSize: "large"}}>Store</th>
                </tr>
                </thead>
                <tbody>
                {shopBuildings.map(building => {
                    return (
                        <BuildingsRow building={building} key={building.id}/>
                    );
                })}
                </tbody>
            </table>
        </>
    )
}

export default HunterStore;
