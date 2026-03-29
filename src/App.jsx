import { useState, useEffect } from "react";

const categories = {

  character: [
  { name: "Адам Кроу", image: "/images/адам_лицо.jpg" },
  { name: "Виктор Кроу", image: "/images/вик_лицо.jpg" }
],

  backstory: [
  {
    name: "Бэттер",
    image: {
      adam: "/images/беттре.jpg",
      victor: "/images/виктор_бэттер.jpg"
    }
  },
  {
    name: "Питчер",
    image: {
      adam: "/images/питчер.jpg",
      victor: "/images/виктор_питчер.jpg"
    }
  },
  {
    name: "Кетчер",
    image: {
      adam: "/images/кэтчер.jpg",
      victor: "/images/виктор_кетчер.jpg"
    }
  }
],

career: [
  {
    name: "Штурмовик",
    image: {
      adam: "/images/штурмовик.jpg",
      victor: "/images/виктор_штурмовик.png"
    }
  },
  {
    name: "Полевой медик",
    image: {
      adam: "/images/медик.jpg",
      victor: "/images/виктор_медик.png"
    }
  },
  {
    name: "Туннельная крыса",
    image: {
      adam: "/images/крыса.jpg",
      victor: "/images/виктор_крыса.png"
    }
  },
  {
    name: "Зачинщик",
    image: {
      adam: "/images/зачинщик.jpg",
      victor: "/images/виктор_зачинщик.png"
    }
  }
],
  traits: [
    { name: "Хладнокровие", image: "/images/хладнокровие.jpg" },
    { name: "Жестокость", image: "/images/жестокость.jpg" },
    { name: "Паранойя", image: "/images/паранойя.jpg" },
    { name: "Импульсивность", image: "/images/импульсивность.jpg" }
  ],
  trauma: [
    { name: "Чувство вины", image: "/images/вина.jpg" },
    { name: "Навязчивые воспоминания", image: "/images/триггеры.jpg" },
    { name: "Зависимость", image: "/images/зависимость.jpg" }
  ]
};

const descriptions = {

  "Адам Кроу": `Ученик демонстрирует повышенную двигательную активность и постоянную смену фокуса внимания.
Не задерживается на одном объекте, часто осматривается, реагирует на малейшие изменения в окружении.`,

"Виктор Кроу": `Ученик проявляет выраженную склонность к доминированию в прямом взаимодействии.
В контакт вступает уверенно, без признаков колебаний, предпочитает решать ситуацию через прямое давление.`,

  "Бэттер": `Бэттер с хорошим чувством момента. Не спешит, выжидает подачу, работает от ситуации.
Иногда слишком долго анализирует и упускает шанс, но когда решается — удар точный и уверенный.
Периодически прибегает к избыточно размашистым ударам с целью подавления и запугивания ближайших соперников.`,
  "Питчер": `Питчер с выраженным контролем. Хорошо читает противника, умеет навязывать темп.
   Предпочитает держать дистанцию и управлять игрой, а не реагировать на неё.
 Отмечается высокая координация движений — в ряде эпизодов использует броски для целенаправленного давления на соперника.`,
  "Кетчер": `Привык к защите, к весу экипировки, к постоянному контакту с угрозой.
В броне чувствует себя естественно, как будто она часть него. В ряде эпизодов целенаправленно нарушал привычный ритм бэттера: менял темп взаимодействия, затягивал решения, варьировал позицию, создавая у соперника ощущение неопределённости.`,

  "Штурмовик": `В бою идёт первым, не ждёт команды, если видит цель. Давит противника за счёт темпа и агрессии. Хорошо работает в хаосе, где другие теряются.
Дисциплина условная — действует эффективно, но не всегда предсказуемо. Потери воспринимает как часть процесса.`,
  "Полевой медик": `Отмечается точный расчёт дозировок — стремится добиться максимального эффекта при минимальном времени воздействия.
Зафиксирован повышенный уровень адреналиновой реакции: в условиях стресса действует быстрее и увереннее. В ряде случаев под воздействием препаратов демонстрирует рост эффективности.`,
  "Туннельная крыса": `Предпочитает замкнутые пространства, где можно контролировать дистанцию и направление.
Работает тихо, аккуратно, без лишних движений. Отмечена высокая скорость передвижения в ограниченных пространствах.
В открытом бою менее эффективен, однако в узких зонах демонстрирует заметное преимущество.`,

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

"Чувство вины": `Это было… неважно. Я сделал всё, что мог …по крайней мере тогда так казалось.
Если бы я принял другое решение — ничего бы не изменилось. Наверное. Я не собираюсь это обсуждать.`,

"Навязчивые воспоминания": `Иногда просто… возвращается. Не как воспоминание — как будто это снова происходит.
Я знаю, что это не сейчас. Понимаю это. Но тело не верит. Давай без этого. Следующий вопрос.`,

"Зависимость": `Я контролирую это. Мне просто нужно иногда… чтобы стало тише.
Ты бы тоже так сделал. После всего этого — ты бы тоже искал способ отключить это.
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

function Card({ item, selected, onClick, onHover, frameStyle }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
      style={{
        cursor: "pointer",
        border: selected
  ? frameStyle.border
  : "1px solid rgba(255,255,255,0.2)",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s ease",
        transform: selected
  ? (frameStyle.transform || "scale(1.05)")
  : "scale(1)",
        boxShadow: selected
  ? frameStyle.boxShadow
  : "none",

animation: selected ? frameStyle.animation : "none",
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

      <div style={{
  padding: "10px",
  textAlign: "center",
  fontFamily: "Share Tech Mono",
  letterSpacing: "2px",
  textTransform: "uppercase"
}}>
  {item.name}
</div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [step, setStep] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
    if (!hovered) {
      setDisplayedText("");
      return;
    }

    const fullText = descriptions[hovered];
    const lines = fullText.split("\n");

    let current = "";
    let i = 0;

    const interval = setInterval(() => {
      if (i < lines.length) {
        current += (i === 0 ? "" : "\n") + lines[i];
        setDisplayedText(current);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [hovered]);

  const [selection, setSelection] = useState({
  character: null,
  backstory: null,
  career: null,
  traits: null,
  trauma: null
});


const getFrameStyle = () => {
  if (selection.character === "Адам Кроу") {
    return {
      border: "1px solid rgba(120,160,200,0.7)",
      boxShadow: "0 0 12px rgba(120,160,200,0.4)",
      animation: "glitch 2s infinite, glitchOpacity 3.5s infinite"
    };
  }

  if (selection.character === "Виктор Кроу") {
  return {
    border: "1px solid rgba(200,120,100,0.8)",
    transform: "scale(1.12)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.8), 0 0 30px rgba(200,120,100,0.7)",
    animation: "pulseHeavy 3s infinite"
  };
}

  return {
    border: "1px solid rgba(200,180,140,0.3)"
  };
};

  const getFinalSections = () => {
  return [

    {
    title: "Характеристика классного руководителя",
    text: descriptions[selection.character]
  },
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

  const steps = ["character", "backstory", "career", "traits", "trauma"];
  const titles = {
      character: "Персонаж",
    backstory: "Спортивная карьера",
    career: "Военная специализация",
    traits: "Черта",
    trauma: "Травма"
  };

  const currentStep = steps[step];
let items = categories[currentStep];

if (
  (currentStep === "backstory" || currentStep === "career") &&
  selection.character
) {
  const isAdam = selection.character === "Адам Кроу";

  items = items.map((item) => ({
    ...item,
    image: isAdam ? item.image.adam : item.image.victor
  }));
}

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
          fontFamily: "Share Tech Mono"
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
    <style>
{`

@keyframes pulseHeavy {
  0% {
    transform: scale(1.05);
    margin-top: 0px;
  }
  50% {
    transform: scale(1.1);
    margin-top: 6px;
  }
  100% {
    transform: scale(1.05);
    margin-top: 0px;
  }
}
@keyframes glitch {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-1px, 1px); }
  40% { transform: translate(1px, -1px); }
  60% { transform: translate(-1px, 0px); }
  80% { transform: translate(1px, 1px); }
  100% { transform: translate(0, 0); }
}

@keyframes glitchOpacity {
  0% { opacity: 1; }
  96% { opacity: 1; }
  97% { opacity: 0.5; }
  98% { opacity: 1; }
  100% { opacity: 1; }
}

@keyframes heavyPress {
  0% { transform: translateY(0); }
  40% { transform: translateY(10px); }
  100% { transform: translateY(6px); }
}

`}
</style>
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
          <h1 style={{
  textAlign: "center",
  marginTop: "20px",
  fontFamily: "Share Tech Mono",
  letterSpacing: "4px",
  textTransform: "uppercase"
}}>
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
if (!item) return null;

  let image = item.image;

  // если это шаги с разными персонажами
  if ((key === "backstory" || key === "career") && selection.character) {
    const isAdam = selection.character === "Адам Кроу";
    image = isAdam ? item.image.adam : item.image.victor;
  }

  return (
    <img
  key={key}
  src={image}
  style={{
    width: "160px",
    height: "220px",
    objectFit: "cover",
    ...getFrameStyle()
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
    padding: "20px",
    minHeight: "80px",
    textAlign: "left",
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: "1.6",
    fontFamily: "'Roboto Mono', monospace",
    letterSpacing: "1px",
    color: "#d6d1c7"
  }}
>
  <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
    {section.text}
  </pre>
</div>

                </div>
              );
            })}
          </div>

          {/* КНОПКА */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <Button
              onClick={() => {
                  setScreen("menu");
                setStep(0);
                setSelection({
                    character: null,
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
            <h1 style={{
  fontFamily: "Share Tech Mono",
  letterSpacing: "3px",
  textTransform: "uppercase"
}}>
  {titles[currentStep]}
</h1>
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
                  frameStyle={getFrameStyle()}
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
    lineHeight: "1.6",
    fontFamily: "'Roboto Mono', monospace",
    letterSpacing: "1px",
    color: "#d6d1c7"
  }}
>
  <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
  {displayedText}
</pre>
</div>

          {/* КНОПКА */}
          <div style={{
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  padding: "20px"
}}>

  {/* Назад */}
  <Button
    disabled={step === 0}
    onClick={() => setStep(step - 1)}
  >
    Назад
  </Button>

  {/* Подтвердить */}
  <Button
    disabled={!selection[currentStep]}
    onClick={() => setStep(step + 1)}
  >
    Подтвердить
  </Button>

  <Button
    onClick={() => {
      setScreen("menu");
      setStep(0);
      setSelection({
        character: null,
        backstory: null,
        career: null,
        traits: null,
        trauma: null
      });
    }}
  >
    В меню
  </Button>

</div>
        </>
      )}
    </div>
  </div>
);
  }
