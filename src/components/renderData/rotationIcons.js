import i8 from '../../img/i8.png';
import i9 from '../../img/i9.png';
import i10 from '../../img/i10.png';
import i11 from '../../img/i11.png';
import i12 from '../../img/i12.png';
import i13 from '../../img/i13.png';

export const cristaIliacaRotations = [
    {
        src: i8,
        name: 'i8'
    },
    {
        src: i9,
        name: 'i9'
    },
    {
        src: i10,
        name: 'i10'
    },
    {
        src: i11,
        name: 'i11'
    }
];

export const sacrumRotations = [
    {
        src: i12,
        name: 'i12'
    },
    {
        src: i13,
        name: 'i13'
    }
];

const allIcons = cristaIliacaRotations.concat(sacrumRotations); // merging arrays for getIconSrc function
export const getIconSrc = (icon) => allIcons.find(obj => obj.name == icon); // used in ViewVisit to render chosen rotation icons