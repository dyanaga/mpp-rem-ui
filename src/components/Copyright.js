import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

export default function Copyright() {
    return (<>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://dianagrigore.com/">
                    Diana Grigore
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                Version: {process.env.REACT_APP_VERSION}
            </Typography>
        </>
    );
}
