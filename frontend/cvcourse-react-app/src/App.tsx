import React, { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface YooMoneyCheckoutWidgetOptions {
  confirmation_token: string;
  return_url: string | undefined;
  customization?: {
    colors: {
      control_primary?: string;
      background?: string;
    };
  };
  error_callback?: (error: any) => void;
}

interface YooMoneyCheckoutWidget {
  render: (containerId: string) => void;
}

interface YooMoneyWindow extends Window {
  YooMoneyCheckoutWidget?: new (options: YooMoneyCheckoutWidgetOptions) => YooMoneyCheckoutWidget;
}

declare const window: YooMoneyWindow;


function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    // Проверяем, что YooMoneyCheckoutWidget доступен в window
    if (typeof window.YooMoneyCheckoutWidget === 'undefined') {
      console.error('YooMoneyCheckoutWidget is not available. Ensure the script is loaded.');
      return;
    }

    const checkout = new window.YooMoneyCheckoutWidget({
      confirmation_token: `${process.env.REACT_APP_SERVER_HOST}:8000/confirmation-token`, // Замените на реальный токен
      return_url: process.env.REACT_APP_SERVER_HOST,

      customization: {
        colors: {
          control_primary: '#1300bfff',
          background: '#81a5eeff',
        },
      },
      error_callback: (error) => {
        console.log(error);
      },
    });

    checkout.render('payment-form');
    
    return () => {
      // Теоретически, YooMoneyCheckoutWidget может предоставлять метод для уничтожения виджета.
      // Если такого метода нет, можно просто очистить контейнер.
      const paymentFormContainer = document.getElementById('payment-form');
      if (paymentFormContainer) {
        paymentFormContainer.innerHTML = ''; // Очистка содержимого контейнера.
      }
    };

  }, []);

  return (
    <div>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <span className="font-semibold text-gray-900 text-2xl">cvcourse<span
                    className="text-blue-500">.ru</span></span>
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a href="#home" className="nav-link py-4 px-3 text-gray-700 hover:text-blue-500">Главная</a>
              <a href="#program" className="nav-link py-4 px-3 text-gray-700 hover:text-blue-500">Программа курса</a>
              <a href="#author" className="nav-link py-4 px-3 text-gray-700 hover:text-blue-500">Об авторе</a>
              <a href="#consultation" className="nav-link py-4 px-3 text-gray-700 hover:text-blue-500">Получить консультацию</a>
            </div>
            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button" onClick={toggleMobileMenu}>
                <svg className="w-6 h-6 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <ul>
              <li><a href="#home" className="block text-sm px-2 py-4 hover:bg-blue-500 hover:text-white" onClick={closeMobileMenu}>Главная</a></li>
              <li><a href="#program" className="block text-sm px-2 py-4 hover:bg-blue-500 hover:text-white" onClick={closeMobileMenu}>Программа курса</a></li>
              <li><a href="#author" className="block text-sm px-2 py-4 hover:bg-blue-500 hover:text-white" onClick={closeMobileMenu}>Об авторе</a></li>
              <li><a href="#consultation" className="block text-sm px-2 py-4 hover:bg-blue-500 hover:text-white" onClick={closeMobileMenu}>Получить консультацию</a></li>
            </ul>
          </div>
        )}
      </nav>
      {/*  */}
      <section id="home" className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Основы компьютерного зрения</h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">Научитесь заставлять компьютеры видеть: распознавать
            объекты, анализировать видео и строить умные приложения на основе изображений</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="#program"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300">Программа</a>
            <a href="#consultation"
              className="border-2 border-white hover:bg-white text-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300">Консультация</a>
          </div>
        </div>
      </section>
      {/*  */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Почему выбирают наш курс</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl course-section">
              <div className="text-blue-500 mb-4">
                <i className="fas fa-laptop-code text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Практические проекты</h3>
              <p className="text-gray-600">Применяйте концепции сразу же с реальными проектами, которые помогут вам
                создать портфолио и уверенность.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl course-section">
              <div className="text-blue-500 mb-4">
                <i className="fas fa-chart-line text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Структурированный учебный план</h3>
              <p className="text-gray-600">Наш тщательно продуманный учебный план ведет вас от основ до продвинутых
                тем в логической последовательности.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl course-section">
              <div className="text-blue-500 mb-4">
                <i className="fas fa-headset text-4xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Поддержка экспертов</h3>
              <p className="text-gray-600">Получите персонализированное руководство через наши консультационные
                услуги, когда вам нужна дополнительная помощь.</p>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <section id="program" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Программа курса</h2>

          <div className="mb-16 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-blue-600">Часть 1:</h3>
                <a href="#"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300">
                  Смотреть на Stepik <i className="fas fa-external-link-alt ml-2"></i>
                </a>
              </div>
              <div className="space-y-4">
                <div>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">1.1 формирование изображений</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">Принципы формирования изображений, включая историю
                          развития фотографических технологий и методов цифровой съемки.</p>
                        <p className="text-gray-700 mt-2">Детали устройства современных фотоматриц (ПЗС
                          и КМОП).</p>
                        <p className="text-gray-700 mt-2">Типичные проблемы, такие как эффект муара и
                          шум.</p>
                        <p className="text-gray-700 mt-2">Обзор различных типов датчиков и источников
                          данных,
                          используемых в компьютерных системах видения.</p>
                        <p className="text-gray-700 mt-2">Формы представления и форматы хранения
                          изображений (BMP, TIFF, PNG, JPEG).</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">1.2 Цвет</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">Основы восприятия цвета человеком, устройство
                          человеческого глаза и механизм цветовосприятия.</p>
                        <p className="text-gray-700 mt-2">Теории цветовосприятия и эксперименты,
                          подтверждающие три-хроматические принципы зрения.</p>
                        <p className="text-gray-700 mt-2">Современные цветовые модели, используемые в
                          компьютерной графике и обработке изображений (RGB, HSV, HSL, YUV, CMYK,
                          LAB).</p>
                        <p className="text-gray-700 mt-2">Методы работы с цветом в рамках конкретных
                          задач распознавания и анализа изображений.</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">2.1 Морфологические
                        операции</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">Основные понятия: Понятие окрестности пикселя,
                          четыре- и восьмисвязные окрестности.</p>
                        <p className="text-gray-700 mt-2">Бинарные изображения: Внутренние и граничные
                          пиксели.</p>
                        <p className="text-gray-700 mt-2">Морфологические операции: Эрозия, дилатация,
                          открытие и замыкание множества.</p>
                        <p className="text-gray-700 mt-2">Практика: Алгоритмы для построения скелетов
                          фигур.</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">2.2 Знакомство с OpenCV</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">Основы восприятия цвета человеком, устройство
                          человеческого глаза и механизм цветовосприятия.</p>
                        <p className="text-gray-700 mt-2">Теории цветовосприятия и эксперименты,
                          подтверждающие три-хроматические принципы зрения.</p>
                        <p className="text-gray-700 mt-2">Современные цветовые модели, используемые в
                          компьютерной графике и обработке изображений (RGB, HSV, HSL, YUV, CMYK,
                          LAB).</p>
                        <p className="text-gray-700 mt-2">Методы работы с цветом в рамках конкретных
                          задач распознавания и анализа изображений.</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">2.3 Методы улучшения
                        изображений</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">Логарифмическая и степенная гамма-коррекция:
                          Улучшение контраста и детализации изображений.</p>
                        <p className="text-gray-700 mt-2">Кусочно-линейные преобразования: Локальное
                          улучшение характеристик изображения.</p>
                        <p className="text-gray-700 mt-2">Гистограммы: Анализ распределения яркости
                          пикселей и нормализация изображений.</p>
                        <p className="text-gray-700 mt-2">Эквализация гистограмм: Повышение
                          воспринимаемого контраста и выявление деталей.</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">3.1 Фильтрация.
                        Сглаживание</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                        <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                          текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">3.2 Поиск контуров</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст
                        </p>
                        <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                          текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">4.1 Поиск лиц</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                        <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                          текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">4.2 Анализ фона и движения на
                        видео</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст
                        </p>
                        <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                          текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-blue-600">Часть 2:</h3>
                <a href="#"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300">
                  View on Stepik <i className="fas fa-external-link-alt ml-2"></i>
                </a>
              </div>

              <div className="space-y-4">
                <div>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">5.1 Поиск по шаблону</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                        <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                          текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">5.2 Ключевые точки</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст
                        </p>
                        <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                          текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">6.1 Сглаживание с сохранением
                        границ</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                        <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                          текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">6.2 Сегментация
                        изображений</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст
                        </p>
                        <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                          текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">7.1 Стереосопоставление</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700">текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                        <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                          текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст текст текст
                          текст текст текст текст текст текст текст текст текст текст</p>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <section id="author" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Об авторе курса</h2>
          <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
            <div className="flex justify-center">
              <div className="bg-gray-200 overflow-hidden shadow-lg">
                <img src="https://urfu.ru/fileadmin/personal_pages/888b4af9a2ee4ae10c80788b289cc345.jpg"
                  alt="Author" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Дунаева Александра Валерьевна</h3>
              <p className="text-gray-600 mb-4">С первого курса университета занимаюсь компьютерным зрением,
                преимущественно обработкой и анализом спутниковых снимков, готовлю диссертацию по этой теме.
                Больше десяти лет занимаюсь машинным обучением.</p>
              <p className="text-gray-600 mb-4">Совмещаю работу в нескольких научных и образовательных организациях:
              </p>
              <p className="text-gray-600 mb-4">• МФТИ - cпециалист по учебно-методической работе (с 2023 г.)</p>
              <p className="text-gray-600 mb-4">• Уральский федеральный университет - cтарший преподаватель кафедры
                высокопроизводительных
                компьютерных технологий (с 2015 г.)</p>
              <p className="text-gray-600 mb-4">• Институт математики и механики УрО РАН - младший научный сотрудник
                (с 2014 г.)
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Достижения:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Премия Губернатора Свердловской области в сфере информационных технологий в 2018 году
                    «За выдающийся вклад в развитие научных исследований в сфере информационных технологий»
                    коллективу авторов Костоусов В.Б., Корнилов Ф.А., Дунаева А.В.</li>
                  <li>Работа, посвященная обнаружению зданий на спутниковых изображениях, была отмечена
                    наградой «Best paper award (1 place). IV International Conference on Information
                    Technology and Nanotechnology (ITNT - 2018). 24-27 April, Samara, Russia».</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <section id="consultation" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Получить консультацию</h2>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-blue-500 text-white p-8">
                <h3 className="text-2xl font-semibold mb-4">Видеозвонок с экспертом</h3>
                <p className="mb-6">Застряли на концепции? Нужен совет по карьере? Хотите получить отзыв о своем
                  проекте? Закажите
                  индивидуальную сессию с автором курса.</p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-check-circle text-xl"></i>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Персональное внимание</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-check-circle text-xl"></i>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">30-минутная сфокусированная сессия</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-check-circle text-xl"></i>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Гибкий график</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 p-8">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-800">$2</span>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Имя:</label>
                    <input type="text" id="name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ваше имя" />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input type="email" id="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ваш email" />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2">Сообщение:</label>
                    <textarea id="message"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Ваш вопрос или сообщение"></textarea>
                  </div>

                  <div className="text-center">
                    <button type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Записаться
                      на консультацию</button>
                  </div>
                </form>
              </div>

              <div id="payment-form"></div>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">cvcourse<span className="text-blue-400">.ru</span></h3>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#program" className="text-gray-400 hover:text-white transition">Course Program</a></li>
                <li><a href="#author" className="text-gray-400 hover:text-white transition">Author</a></li>
                <li><a href="#consultation" className="text-gray-400 hover:text-white transition">Consultation</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Связаться с нами</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-telegram"></i></a>
                <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-github"></i></a>
              </div>
              <div className="mt-4">
                <p className="text-gray-400">Email: info@cvcourse.ur</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 cvcourse.ur All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
