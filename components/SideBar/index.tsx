import styles from "./sidebar.module.css";
import { FaFolder, FaPlusCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import TextIconButton from "../Buttons/TextIconButton";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SideBar (props:any) {

    const router = useRouter();

    const { currentNavPosition, allNavs } = props;

    return (
        <div className={styles.sidebar}>
            <div className="logo">BUGGER</div>

            <div className={styles.create_project_btn_wrapper}>
                <TextIconButton label='Create New Project' Icon={FaPlusCircle} onclick={ ()=> router.push('/project/create')  } />
            </div>

            <nav className={styles.navigation}>
                {   allNavs.map((navItem:any, count:any)=> {
                        return  <div 
                                    className={`${styles.nav_item} ${ (navItem.isActive)? `${styles.active_background}` : null}` }
                                    key={count}
                                > 
                                    {/* <Link href={`${navItem.id}`}> */}
                                        <a href={`${navItem.id}`}>
                                            <div
                                                className={`${styles.nav_item_parent} ${ (navItem.isActive)? `${styles.active_foreground}` : null}` }
                                            >
                                                <FaFolder className={styles.icon} /> 
                                                <div className={styles.label}> { navItem.label } </div>
                                            </div>
                                        </a>
                                    {/* </Link> */}
                                </div>
                    })
                }
            </nav>
        </div>
    );
}