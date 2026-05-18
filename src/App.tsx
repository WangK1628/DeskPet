import { useMemo, useState } from 'react';
import { Live2DStage } from './Live2DStage';

const heroes = [
  { id: 'orange', name: '橙留香', model: '/live2d/fruits/chengliuxiang.model3.json' },
  { id: 'pineapple', name: '菠萝吹雪', model: '/live2d/fruits/boluochuixue.model3.json' },
  { id: 'strawberry', name: '陆小果', model: '/live2d/fruits/luxiaoguo.model3.json' }
];

export default function App() {
  const [hero, setHero] = useState(heroes[0]);
  const caption = useMemo(() => `当前果宝：${hero.name}`, [hero.name]);

  return (
    <main className="app">
      <section className="panel">
        <h1>果宝特攻 · 桌面宠物</h1>
        <p>{caption}</p>
        <div className="actions">
          {heroes.map((item) => (
            <button key={item.id} onClick={() => setHero(item)}>
              {item.name}
            </button>
          ))}
        </div>
        <small>请将你制作的 Live2D 模型文件放入 public/live2d/fruits 并保持命名一致。</small>
      </section>
      <Live2DStage modelPath={hero.model} />
    </main>
  );
}
