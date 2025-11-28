import React from 'react';
import { Camera, Video, Clock, MonitorPlay } from 'lucide-react';
import { CurriculumDay } from '../types';

const Curriculum: React.FC = () => {
  const curriculumData: CurriculumDay[] = [
    {
      day: 1,
      title: "Фотогенерация и Ретушь",
      focus: 'photo',
      items: [
        {
          id: 1,
          title: "Обзор Нейросетей и Новинок",
          description: "Разбор всех актуальных моделей на рынке. Тренды, новшества и выбор лучших инструментов под ваши задачи.",
          topics: []
        },
        {
          id: 2,
          title: "Photoshop AI: Идеальный результат",
          description: "Специальный урок по постобработке. Учимся доводить генерации до коммерческого качества с помощью нейросетей в Photoshop.",
          topics: []
        },
        {
          id: 3,
          title: "Живая Консультация (1 час)",
          description: "После просмотра уроков мы созваниваемся. Разбираем ваши вопросы и закрепляем материал на практике.",
          topics: []
        }
      ]
    },
    {
      day: 2,
      title: "Видео, Звук и Голос",
      focus: 'video',
      items: [
        {
          id: 4,
          title: "Экосистема Видеогенерации",
          description: "В какой нейросети лучше работать? Сравнение инструментов (Runway, Kling и др.) для разных сценариев.",
          topics: []
        },
        {
          id: 5,
          title: "Работа со Звуком и Голосом",
          description: "Генерация саунд-дизайна, фоновой музыки и профессиональная озвучка (липсинк, клонирование голоса).",
          topics: []
        },
        {
          id: 6,
          title: "Финальный Разбор (1 час)",
          description: "Второй созвон. Закрываем оставшиеся вопросы по видео и обсуждаем внедрение навыков в работу.",
          topics: []
        }
      ]
    }
  ];

  return (
    <section id="curriculum" className="py-20 bg-brand-dark relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Как проходит обучение</h2>
          
          <div className="bg-brand-surface/30 rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto mb-10">
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
                <div className="flex items-center gap-3">
                   <MonitorPlay className="w-5 h-5 text-brand-accent" />
                   <span className="text-sm">~4 урока в блоке (1-1.5 ч всего)</span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/10"></div>
                <div className="flex items-center gap-3">
                   <Clock className="w-5 h-5 text-brand-primary" />
                   <span className="text-sm">2 живых созвона (Q&A)</span>
                </div>
             </div>
             <p className="mt-4 text-gray-400 text-sm leading-relaxed">
               В каждом блоке ~4 урока (суммарно 1-1.5 часа просмотра). Количество уроков может увеличиваться при выходе важных обновлений в ИИ. Вы смотрите материалы в удобном темпе, а затем мы разбираем вопросы на созвоне.
             </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {curriculumData.map((day) => (
            <div key={day.day} className="bg-brand-surface/50 rounded-2xl p-6 border border-white/5 flex flex-col">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className={`p-2.5 rounded-lg ${day.focus === 'photo' ? 'bg-brand-accent/10 text-brand-accent' : 'bg-brand-primary/10 text-brand-primary'}`}>
                  {day.focus === 'photo' ? <Camera className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">День {day.day}</div>
                  <h3 className="text-xl font-bold text-white">{day.title}</h3>
                </div>
              </div>

              <div className="space-y-8 flex-grow">
                {day.items.map((item, index) => (
                  <div key={item.id} className="flex gap-4">
                    <span className={`font-mono text-sm pt-1 ${day.focus === 'photo' ? 'text-brand-accent/60' : 'text-brand-primary/60'}`}>0{index + 1}</span>
                    <div>
                        <h4 className="text-white font-medium mb-1.5">{item.title}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                        {item.description}
                        </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;