import React, {useCallback, useEffect, useState} from "react";
import {IHunterBase} from "../../domain/IHunterBase";
import {HunterBaseApi} from "../../services/HunterBaseApi";
import {ShopBuildingsApi} from "../../services/ShopBuildingsApi";
import {IShopBuilding} from "../../domain/IShopBuilding";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import {green} from "@material-ui/core/colors";
import background from "../../BuildingsGallery/background.jpg";
import {BuildingsApi} from "../../services/BuildingsApi";
import {IBuildingCreate} from "../../domain/IBuildingCreate";
import {IBuilding} from "../../domain/IBuilding";

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M7,10L12,15L17,10H7Z" />
        </SvgIcon>
    );
}

// @ts-ignore
function PlayerStore({ onNameChange }) {

    const PlayerStore = (data) => {
        const [shopBuildings, setShopBuildings] = useState([]);
        const [buildings, setBuildings] = useState([]);
        const [hovering, setHovering] = useState("");
        const [hunterBase, setHunterBase] = useState();


        function MouseOver(event) {
            setHovering(event.currentTarget.id)
        }

        function MouseOut(event) {
            setHovering("")
        }

        async function BuyBuilding(shopBuilding) {
            console.log("buy: " + shopBuilding)

            let newBuilding = new class {
                appUserId = hunterBase.appUserId;
                nameOfBuilding = shopBuilding.nameOfBuilding;
                maxHealth = shopBuilding.maxHealth;
                levelOfBuilding = 1;
                buildingType = shopBuilding.buildingType;
                hunterBaseId = hunterBase.id;
            };

            data.setChanged();

            hunterBase.coins = hunterBase.coins - shopBuilding.price;

            await BuildingsApi.create(newBuilding).then(async r =>
                await HunterBaseApi.update(hunterBase),
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
                                    {props.building.attackDamage !== undefined &&
                                    <Typography><b>Attack:</b> {props.building.attackDamage}</Typography>
                                    }
                                    {props.building.rangeOfBuilding !== undefined &&
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

        const HoverRow = (props) => (
            <td>{props.building.id}</td>
        );

        useEffect(() => {
            const callApi = async () => {
                const base = await HunterBaseApi.getHunterBase();
                setHunterBase(base);
                const shopBuildings = await ShopBuildingsApi.getAll();
                setShopBuildings(shopBuildings);
            };
            callApi();
        }, [1]);

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
        );
    }
}
export default PlayerStore;
