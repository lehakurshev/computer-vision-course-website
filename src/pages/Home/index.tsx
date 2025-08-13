import PageTree from '../../components/PageTree';
import TelegramPostWidget from '../../components/TelegramDiscussionWidget';
import { Button, Modal, Box, Backdrop, Fade } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import '../styles.scss';

function HomePage() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
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
              className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300">Консультация</a>
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
                <h3 className="text-2xl font-semibold text-blue-600">Часть 1: Основы компьютерного зрения</h3>
                <a href="#"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300">
                  Смотреть на Stepik <i className="fas fa-external-link-alt ml-2"></i>
                </a>
              </div>

              <div className="space-y-4">

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="subsection-toggle w-full text-left p-4 bg-gray-50 hover:bg-gray-100 font-medium">
                    Первый урок
                  </button>
                  <div className="subsection-content">
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">1.1 формирование
                        изображений</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
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
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">1.2 Цвет</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                          <p className="text-gray-700">Основы восприятия цвета человеком, устройство
                            человеческого глаза и механизм цветовосприятия.</p>
                          <p className="text-gray-700 mt-2">Теории цветовосприятия и эксперименты,
                            подтверждающие три-хроматические принципы зрения.</p>
                          <p className="text-gray-700 mt-2">Современные цветовые модели, используемые в
                            компьютерной графике и обработке изображений (RGB, HSV, HSL, YUV, CMYK,
                            LAB).</p>
                          <p className="text-gray-700 mt-2">Методы работы с цветом в рамках конкретных
                            задач распознавания и анализа изображений.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="subsection-toggle w-full text-left p-4 bg-gray-50 hover:bg-gray-100 font-medium">
                    Второй урок
                  </button>
                  <div className="subsection-content">
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">2.1 Морфологические
                        операции</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                          <p className="text-gray-700">Основные понятия: Понятие окрестности пикселя,
                            четыре- и восьмисвязные окрестности.</p>
                          <p className="text-gray-700 mt-2">Бинарные изображения: Внутренние и граничные
                            пиксели.</p>
                          <p className="text-gray-700 mt-2">Морфологические операции: Эрозия, дилатация,
                            открытие и замыкание множества.</p>
                          <p className="text-gray-700 mt-2">Практика: Алгоритмы для построения скелетов
                            фигур.</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">2.2 Знакомство с OpenCV</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                          <p className="text-gray-700">Библиотека OpenCV: Основные возможности и структура
                            библиотеки.</p>
                          <p className="text-gray-700 mt-2">Начало работы: Установка среды разработки и
                            написание первой программы.</p>
                          <p className="text-gray-700 mt-2">Класс Mat: Работа с изображениями различных
                            форматов и глубины цветов.</p>
                          <p className="text-gray-700 mt-2">Пространственные преобразования:
                            Преобразования координат и выбор регионов интереса.</p>
                          <p className="text-gray-700 mt-2">Доступ к пикселям: Методы для чтения и записи
                            отдельных пикселей.</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">2.3 Методы улучшения
                        изображений</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                          <p className="text-gray-700">Логарифмическая и степенная гамма-коррекция:
                            Улучшение контраста и детализации изображений.</p>
                          <p className="text-gray-700 mt-2">Кусочно-линейные преобразования: Локальное
                            улучшение характеристик изображения.</p>
                          <p className="text-gray-700 mt-2">Гистограммы: Анализ распределения яркости
                            пикселей и нормализация изображений.</p>
                          <p className="text-gray-700 mt-2">Эквализация гистограмм: Повышение
                            воспринимаемого контраста и выявление деталей.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="subsection-toggle w-full text-left p-4 bg-gray-50 hover:bg-gray-100 font-medium">
                    Третий урок
                  </button>
                  <div className="subsection-content">
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">3.1 Фильтрация.
                        Сглаживание</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                          <p className="text-gray-700">текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                          <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                            текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">3.2 Поиск контуров</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="subsection-toggle w-full text-left p-4 bg-gray-50 hover:bg-gray-100 font-medium">
                    Четвертый урок
                  </button>
                  <div className="subsection-content">
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">4.1 Поиск лиц</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                          <p className="text-gray-700">текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                          <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                            текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">4.2 Анализ фона и движения на
                        видео</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-blue-600">Часть 2: Основы компьютерного зрения</h3>
                <a href="#"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300">
                  View on Stepik <i className="fas fa-external-link-alt ml-2"></i>
                </a>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="subsection-toggle w-full text-left p-4 bg-gray-50 hover:bg-gray-100 font-medium">
                    Пятый урок
                  </button>
                  <div className="subsection-content">
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">5.1 Поиск по шаблону</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                          <p className="text-gray-700">текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                          <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                            текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">5.2 Ключевые точки</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                          <p className="text-gray-700">текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                          <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                            текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="subsection-toggle w-full text-left p-4 bg-gray-50 hover:bg-gray-100 font-medium">
                    Шестой урок
                  </button>
                  <div className="subsection-content">
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">6.1 Сглаживание с сохранением
                        границ</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                          <p className="text-gray-700">текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                          <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                            текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">6.2 Сегментация
                        изображений</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                          <p className="text-gray-700">текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                          <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                            текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="subsection-toggle w-full text-left p-4 bg-gray-50 hover:bg-gray-100 font-medium">
                    Седьмой урок
                  </button>
                  <div className="subsection-content">
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-left font-medium mb-2">7.1 Стереосопоставление</button>
                      <div className="subsection-content pl-4">
                        <div className="bg-gray-50 p-4 rounded-lg mt-2">
                          <p className="text-gray-700">текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                          <p className="text-gray-700 mt-2">текст текст текст текст текст текст текст
                            текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст текст текст
                            текст текст текст текст текст текст текст текст текст текст</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
  );
}

// Default export
export default HomePage;
