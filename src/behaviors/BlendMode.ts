import { BLEND_MODES } from 'pixi.js';
import { Particle } from '../Particle';
import { BehaviorOrder, IEmitterBehavior } from './Behaviors';
import { BehaviorEditorConfig } from './editor/Types';

/**
 * A Blend Mode behavior that applies a blend mode value to the particle at initialization.
 *
 * Example config:
 * ```javascript
 * {
 *     type: 'blendMode',
 *     config: {
 *         blendMode: 'multiply',
 *     }
 * }
 * ```
 */
export class BlendModeBehavior implements IEmitterBehavior
{
    public static type = 'blendMode';
    public static editorConfig: BehaviorEditorConfig = null;

    public order = BehaviorOrder.Normal;
    private value: BLEND_MODES;
    constructor(config: {
        /**
         * Blend mode of all particles. This value is a key from
         * [PixiJs's BLEND_MODE enum](https://pixijs.download/release/docs/PIXI.html#BLEND_MODES).
         */
        blendMode: BLEND_MODES;
    })
    {
        this.value = config.blendMode;
    }

    initParticles(first: Particle): void
    {
        let next = first;

        while (next)
        {
            next.blendMode = this.value;
            next = next.next;
        }
    }
}
