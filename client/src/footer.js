import {CardFooter} from "shards-react";

export default function Footer({institute}) {
    return (
        <CardFooter style={{textAlign: 'center', marginTop: 30}}>
            2021 © E-Prints &nbsp;&bull;&nbsp; {institute}
        </CardFooter>
    );
}
