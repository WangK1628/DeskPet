import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

type Props = { modelPath: string };

export function Live2DStage({ modelPath }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let app: PIXI.Application | undefined;
    let mounted = true;

    const mount = async () => {
      if (!hostRef.current) return;

      app = new PIXI.Application({
        width: 420,
        height: 420,
        backgroundAlpha: 0,
        antialias: true
      });

      hostRef.current.innerHTML = '';
      hostRef.current.appendChild(app.view as HTMLCanvasElement);

      try {
        setLoadError(null);
        const model = await Live2DModel.from(modelPath);
        if (!mounted || !app) return;

        model.scale.set(0.22);
        model.x = app.renderer.width / 2;
        model.y = app.renderer.height * 0.92;
        model.anchor.set(0.5, 1);
        model.interactive = true;
        model.on('pointerdown', () => model.motion('TapBody'));
        app.stage.addChild(model);
      } catch (error) {
        console.error('Live2D 模型加载失败:', error);
        setLoadError(`模型加载失败：${modelPath}`);
      }
    };

    mount();

    return () => {
      mounted = false;
      app?.destroy(true, { children: true, texture: true, baseTexture: true });
    };
  }, [modelPath]);

  return (
    <div className="live2d-wrap">
      <div className="live2d" ref={hostRef} />
      {loadError && <p className="live2d-error">{loadError}</p>}
    </div>
  );
}
