import { BLEND_MODES } from 'pixi.js';
import { BlendModeBehavior } from '../../BlendMode';

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;
type UnionToOvlds<U> = UnionToIntersection<
U extends any ? (f: U) => void : never
>;
type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;
type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
    ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
    : [T, ...A];
const AllBlendModes: UnionToArray<BLEND_MODES> = [
    'inherit',
    'normal',
    'add',
    'multiply',
    'screen',
    'darken',
    'lighten',
    'erase',
    'color-dodge',
    'color-burn',
    'linear-burn',
    'linear-dodge',
    'linear-light',
    'hard-light',
    'soft-light',
    'pin-light',
    'difference',
    'exclusion',
    'overlay',
    'saturation',
    'color',
    'luminosity',
    'normal-npm',
    'add-npm',
    'screen-npm',
    'none',
    'subtract',
    'divide',
    'vivid-light',
    'hard-mix',
    'negation',
];

function makeReadable(input: string)
{
    const words = input.split('_');

    for (let i = 0; i < words.length; ++i)
    {
        if (words[i] === 'SRC')
        {
            words[i] = 'Source';
        }
        else if (words[i] === 'DST')
        {
            words[i] = 'Destination';
        }
        else
        {
            words[i] = words[i][0] + words[i].substring(1).toLowerCase();
        }
    }

    return words.join(' ');
}

BlendModeBehavior.editorConfig = {
    category: 'blend',
    title: 'Blend Mode',
    props: [
        {
            type: 'select',
            name: 'blendMode',
            title: 'Blend Mode',
            description: 'Blend mode of all particles. IMPORTANT - The WebGL renderer only supports the Normal, '
                + 'Add, Multiply and Screen blend modes. Anything else will silently act like Normal.',
            default: 'NORMAL',
            options: AllBlendModes.map((key) => ({ value: key, label: makeReadable(key) })),
        },
    ],
};
