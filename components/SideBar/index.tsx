import styles from "./sidebar.module.css";
import { FaFolder, FaFolderOpen, FaFile, FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useState } from "react";

export default function SideBar (props:any) {

    // VARIABLES
    // var count = 0, subCount = 0;
    const [navList, setNavList] = useState([
        {
            label: 'projects',
            icon: FaFolder,
            iconActive: FaFolderOpen,
            isActive: true,
            children: [
                {
                    label: 'demo project',
                    icon: FaFile,
                    iconActive: FaFile,
                    isActive: false,
                },
                {
                    label: 'another demo project',
                    icon: FaFile,
                    iconActive: FaFile,
                    isActive: false,
                }
            ]
        },
        {
            label: 'projects',
            icon: FaFolder,
            iconActive: FaFolderOpen,
            isActive: false,
            children: []
        }
    ]);

    // FUNCTIONS
    const activateNavItem = (position:number, subPosition:number) => {
        const updatedNavList = [...navList];
        updatedNavList.forEach((navItem)=> {
            navItem.isActive = false
            navItem.children.forEach((childItem)=> childItem.isActive = false )
        });
        updatedNavList[position].isActive = true;

        if(navList[position].children.length > 0) {
            updatedNavList[position].children.forEach((subnavItem)=> subnavItem.isActive = false);
            updatedNavList[position].children[subPosition].isActive = true;
        }
        
        setNavList(updatedNavList);
    }
    

    return (
        <div className={styles.sidebar}>
            <div className="logo">BUGGER</div>
            <nav className={styles.navigation}>
                {   navList.map((navItem, count)=> {
                        return  <div 
                                    className={`${styles.nav_item} ${(navItem.isActive)? `${styles.active_background}` : null}` }
                                    key={count} 
                                >
                                    <div 
                                        className={`${styles.nav_item_parent} ${(navItem.isActive)? `${styles.active_foreground}` : null}`}
                                        onClick={()=> activateNavItem(count, 0) }
                                    >
                                        <navItem.icon className={styles.icon} /> 
                                        <div className={styles.label}> {navItem.label} </div>
                                        {
                                            (navItem.children.length > 0) ?
                                            (navItem.isActive) ? <FaCaretDown className={styles.arrow_icon} />
                                            : <FaCaretUp className={styles.arrow_icon} />
                                            : null
                                        }
                                    </div>
                                    
                                    {   
                                        (navItem.isActive) ? 
                                        <div className={styles.nav_item_children}>
                                            {
                                                (navItem.children.length > 0) 
                                                ? navItem.children.map((subNav, subCount)=> {
                                                    return  <div 
                                                                className={`${(subNav.isActive)? `${styles.active_foreground}` : null}` }
                                                                onClick={()=> activateNavItem(count, subCount) }
                                                                key={subCount}
                                                            >   
                                                                {
                                                                    (subNav.isActive) 
                                                                    ? <subNav.iconActive className={styles.icon} /> 
                                                                    : <subNav.icon className={styles.icon} />
                                                                } 
                                                                <div className={styles.label}> {subNav.label} </div>
                                                            </div>
                                                })
                                                : null
                                            }
                                        </div>
                                        : null
                                    }
                                </div>
                    })
                }
            </nav>
        </div>
    );
}