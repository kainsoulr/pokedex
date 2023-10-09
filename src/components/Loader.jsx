import React from "react";
import { DotWave } from '@uiball/loaders'

export const Loader = () => {
    return (
        <div className="container-loader">
            <DotWave size={45} speed={1} color="black"
            />
        </div>
    )
}