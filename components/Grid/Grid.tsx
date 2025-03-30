"use client";

import { FC } from "react";
import MuiGrid from "@mui/material/Grid2";
import { Grid2Props } from "@mui/material/Grid2/Grid2";

export const Grid: FC<Grid2Props> = ({ children, container, spacing, ...rest }) => {
    const defaultSpacing = container ? { xs: 6, md: 8 } : undefined;
    const isSpacingNum = typeof spacing === "number";

    return (
        <MuiGrid
            container={container}
            rowSpacing={isSpacingNum ? spacing : defaultSpacing}
            columnSpacing={isSpacingNum ? spacing : defaultSpacing}
            {...rest}
        >
            {children}
        </MuiGrid>
    );
};

export default Grid;
