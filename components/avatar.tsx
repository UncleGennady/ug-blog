import React from 'react';
import Image from "next/image";
import styles from "@/styles/Avatar.module.scss"

const Avatar = ({src}:{src:string}) => {
    return (
        <div className={styles.avatar}>
            <Image
                loader={() =>src}
                src={src}
                alt={"#"}
                unoptimized={true}
                fill
            />
        </div>
    );
};

export default Avatar;