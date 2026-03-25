import { useState } from "react";

const categories = {
  backstory: [
    { name: "Беттер", image: "/images/беттре.jpg" },
    { name: "Питчер", image: "images/питчер.jpg" },
    { name: "Кэтчер", image: "/images/кэтчер.jpg" }
  ],
  career: [
    { name: "Штурмовик", image: "images/штурмовик.jpg" },
    { name: "Полевой медик", image: "images/медик.jpg" },
    { name: "Туннельная крыса", image: "images/крыса.jpg" },
    { name: "Зачинщик", image: "images/зачинщик.jpg" }
  ],
  traits: [
    { name: "Хладнокровие", image: "images/хладнокровие.jpg" },
    { name: "Жестокость", image: "images/жестокость.jpg" },
    { name: "Паранойя", image: "images/паранойя.jpg" },
    { name: "Импульсивность", image: "images/импульсивность.jpg" }
  ],
  trauma: [
    { name: "Чувство вины", image: "images/вина.jpg" },
    { name: "Навязчивые воспоминания", image: "images/триггеры.jpg" },
    { name: "Зависимость", image: "images/зависимость.jpg" }
  ]
};

const descriptions = {
  "Беттер": `Беттер с хорошим чувством момента. Не спешит, выжидает подачу, работает от ситуации.
Иногда слишком долго анализирует и упускает шанс, но когда решается — удар точный и уверенный.
Дисциплинирован, но под давлением может начать сомневаться.`,
  "Питчер": `Питчер с выраженным контролем. Предпочитает держать дистанцию и управлять игрой, а не реагировать на неё.
Хорошо читает противника, умеет навязывать темп.
Есть склонность к холодной отстранённости — в критические моменты действует расчётливо, но может терять гибкость.`,
  "Кэтчер": `Кэтчер. Спокойный, собранный, не поддаётся давлению. Работает в центре событий и чувствует себя там уверенно.
Привык к защите, к весу экипировки, к постоянному контакту с угрозой.
Непоколебим — даже под давлением не теряет контроль. В броне чувствует себя естественно, как будто она часть него.`,

  "Штурмовик": `Штурмовик. В бою идёт первым, не ждёт команды, если видит цель.
Давит противника за счёт темпа и агрессии. Хорошо работает в хаосе, где другие теряются.
Дисциплина условная — действует эффективно, но не всегда предсказуемо.
Потери воспринимает как часть процесса.`,
  "Полевой медик": `Полевой медик. Держится ближе к группе, постоянно отслеживает состояние бойцов.
Работает под огнём без паники, быстро принимает решения.
Склонен ставить чужую жизнь выше своей, из-за чего иногда рискует неоправданно.
Надёжен — если есть шанс спасти, он его использует.`,
  "Туннельная крыса": `Туннельная крыса. Предпочитает замкнутые пространства, где можно контролировать дистанцию и направление.
Работает тихо, аккуратно, без лишних движений.
Психологически устойчив в условиях, которые ломают большинство.
В открытом бою менее эффективен, но в узких пространствах — один из лучших.`,

"Зачинщик": `Зачинщик. Инициирует контакт, провоцирует противника на ошибку.
Не просто идёт первым — задаёт ритм всему бою.
Хорошо чувствует момент, когда нужно сорвать позицию или навязать столкновение.
Есть склонность к риску — иногда переоценивает свои возможности, но именно за счёт этого ломает оборону.`,

  "Хладнокровие": `Наблюдается выраженная эмоциональная стабилизация в стрессовых условиях.
Субъект сохраняет ясность мышления и контроль над действиями даже при непосредственной угрозе.
Реакции замедлены, но точны.
Отмечается возможное снижение эмпатии и эмоционального отклика.`,

"Жестокость": `Снижен порог реакции на насилие.
Субъект демонстрирует отсутствие выраженного эмоционального сопротивления при причинении вреда.
В ряде случаев наблюдается тенденция к избыточному применению силы.
Признаки сочувствия и сдерживания ослаблены или отсутствуют.`,

"Паранойя": `Постоянное ощущение угрозы.
Субъект склонен интерпретировать нейтральные события как потенциально опасные.
Повышенная настороженность, частая проверка окружения.
Возможны нарушения доверия и трудности в кооперации.`,

"Импульсивность": `Сниженный контроль над принятием решений.
Действия часто совершаются без полной оценки последствий.
Быстрая реакция в динамичной среде, однако сопровождается нестабильностью поведения.
Высокий риск ошибочных решений в критических ситуациях.`,

"Чувство вины": `Это было… неважно. Я сделал всё, что мог.
…по крайней мере тогда так казалось.
Если бы я принял другое решение — ничего бы не изменилось.
Наверное.

Я не собираюсь это обсуждать.`,

"Навязчивые воспоминания": `Иногда просто… возвращается.
Не как воспоминание — как будто это снова происходит.

Я знаю, что это не сейчас. Понимаю это.
Но тело не верит.

Давай без этого. Следующий вопрос.`,

"Зависимость": `Я контролирую это.
Мне просто нужно иногда… чтобы стало тише.

Ты бы тоже так сделал.
После всего этого — ты бы тоже искал способ отключить это.

Это не проблема. Просто… не лезь.`
};


function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.background = "rgba(200,180,140,0.3)";
          e.target.style.transform = "scale(1.05)";
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "rgba(120,110,90,0.2)";
        e.target.style.transform = "scale(1)";
      }}
      style={{
        padding: "12px 30px",
        fontSize: "16px",
        cursor: disabled ? "not-allowed" : "pointer",
        background: "rgba(120,110,90,0.2)",
        color: "#d6d1c7",
        border: "1px solid rgba(200,180,140,0.3)",
        letterSpacing: "2px",
        transition: "all 0.2s ease",
        opacity: disabled ? 0.5 : 1
      }}
    >
      {children}
    </button>
  );
}

function Card({ item, selected, onClick, onHover }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
      style={{
        cursor: "pointer",
        border: selected ? "2px solid #d6d1c7" : "1px solid rgba(255,255,255,0.2)",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s ease",
        transform: selected ? "scale(1.05)" : "scale(1)",
        boxShadow: selected ? "0 0 20px rgba(255,255,255,0.3)" : "none",
        maxWidth: "260px",
        width: "100%"
      }}
    >
      <div style={{ aspectRatio: "3 / 4", overflow: "hidden" }}>
        <img
          src={item.image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: selected ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.3s ease"
          }}
        />
      </div>

      <div style={{ padding: "10px", textAlign: "center" }}>
        {item.name}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [step, setStep] = useState(0);
  const [hovered, setHovered] = useState(null);



  const [selection, setSelection] = useState({
    backstory: null,
    career: null,
    traits: null,
    trauma: null
  });

  const getFinalSections = () => {
  return [
    {
      title: "Из личного дела тренера",
      text: descriptions[selection.backstory]
    },
    {
      title: "Заметки командира роты",
      text: descriptions[selection.career]
    },
    {
      title: "Заключение психотерапевта",
      text: descriptions[selection.traits]
    },
    {
      title: "Личные показания",
      text: descriptions[selection.trauma]
    }
  ];
};

  const steps = ["backstory", "career", "traits", "trauma"];
  const titles = {
    backstory: "Спортивная карьера",
    career: "Военная специализация",
    traits: "Черта",
    trauma: "Травма"
  };

  const currentStep = steps[step];
  const items = categories[currentStep];

  const handleSelect = (name) => {
    setSelection({ ...selection, [currentStep]: name });
  };

  const generateStory = () => {
    return Object.values(selection)
      .map((v) => descriptions[v])
      .filter(Boolean)
      .join(" ");
  };

  // 🟢 МЕНЮ
  if (screen === "menu") {
    return (
      <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "fixed", inset: 0, backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover" }} />
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.2)" }} />

        <div style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          color: "#d6d1c7",
          fontFamily: "Special Elite"
        }}>
          <h1 style={{
            fontSize: "80px",
            letterSpacing: "10px",
            transform: "rotate(-1deg)",
            textShadow: "2px 2px 0 rgba(0,0,0,0.8)"
          }}>
            CROW
          </h1>

          <Button onClick={() => setScreen("creator")}>
            Создать персонажа
          </Button>
        </div>
      </div>
    );
  }
// 🟢 МЕНЮ
if (screen === "menu") {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>

      {/* фон */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* затемнение */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.2)"
        }}
      />

      {/* контент */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          color: "#d6d1c7",
          fontFamily: "Special Elite"
        }}
      >
        <h1
          style={{
            fontSize: "80px",
            letterSpacing: "10px",
            transform: "rotate(-1deg)",
            textShadow: "2px 2px 0 rgba(0,0,0,0.8)"
          }}
        >
          CROW
        </h1>

        <Button onClick={() => setScreen("creator")}>
          Создать персонажа
        </Button>
      </div>
    </div>
  );
}
  // 🔴 СОЗДАНИЕ / ИТОГ
  return (
  <div style={{ width: "100vw", height: "100vh", position: "relative", color: "white" }}>

    {/* ФОН */}
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    />

    {/* ЗАТЕМНЕНИЕ */}
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)"
      }}
    />

    {/* КОНТЕНТ */}
    <div
  style={{
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }}
    >

      {step >= steps.length ? (
        <>
          {/* ЗАГОЛОВОК */}
          <h1 style={{ textAlign: "center", marginTop: "20px" }}>
            Персонаж создан
          </h1>

          {/* КАРТИНКИ */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              padding: "30px",
              flexWrap: "wrap"
            }}
          >
            {steps.map((key) => {
              const item = categories[key].find(i => i.name === selection[key]);

              return (
                <img
                  key={key}
                  src={item.image}
                  style={{
                    width: "160px",
                    height: "220px",
                    objectFit: "cover",
                    border: "1px solid rgba(200,180,140,0.4)"
                  }}
                />
              );
            })}
          </div>

          {/* ДОСЬЕ */}
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              padding: "20px"
            }}
          >
            {getFinalSections().map((section, i) => {
              const isPersonal = section.title === "Личные показания";

              return (
                <div key={i} style={{ marginBottom: "30px" }}>

                  {/* ЗАГОЛОВОК */}
                  <div
                    style={{
                      color: "#cfc9b8",
                      fontSize: "13px",
                      letterSpacing: "3px",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      borderLeft: "3px solid rgba(200,180,140,0.5)",
                      paddingLeft: "10px",
                      opacity: 0.8
                    }}
                  >
                    {section.title}
                  </div>

                  {/* ТЕКСТ */}
                  <div
                    style={{
                      lineHeight: "1.7",
                      fontSize: "15px",
                      paddingLeft: "10px",
                      color: isPersonal ? "#e0d8c8" : "white",
                      fontStyle: isPersonal ? "italic" : "normal",
                      opacity: isPersonal ? 1 : 0.9
                    }}
                  >
                    {section.text}
                  </div>

                </div>
              );
            })}
          </div>

          {/* КНОПКА */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <Button
              onClick={() => {
                setStep(0);
                setSelection({
                  backstory: null,
                  career: null,
                  traits: null,
                  trauma: null
                });
              }}
            >
              Создать заново
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* HEADER */}
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>{titles[currentStep]}</h1>
          </div>

          {/* GRID */}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: `repeat(${items.length}, 1fr)`,
              gap: "20px",
              padding: "20px",
              justifyItems: "center",
              alignItems: "center"
            }}
          >
            {items.map((item) => (
              <div
                key={item.name}
                style={{
                  opacity:
                    selection[currentStep] &&
                    selection[currentStep] !== item.name
                      ? 0.4
                      : 1,
                  transition: "opacity 0.3s"
                }}
              >
                <Card
                  item={item}
                  selected={selection[currentStep] === item.name}
                  onClick={() => handleSelect(item.name)}
                  onHover={setHovered}
                />
              </div>
            ))}
          </div>

          {/* ОПИСАНИЕ */}
          <div
            style={{
              padding: "20px",
              minHeight: "80px",
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.6"
            }}
          >
            {hovered && descriptions[hovered]}
          </div>

          {/* КНОПКА */}
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Button
              disabled={!selection[currentStep]}
              onClick={() => setStep(step + 1)}
            >
              Подтвердить
            </Button>
          </div>
        </>
      )}
    </div>
  </div>
);
  }
