---
title:
  ru: "RL Suite: ИИ для игр"
  en: "RL Suite: Game AI Agents"
description:
  ru: "Набор RL-агентов (MCTS, DQN, PPO) для игр Breakout, Шашки и Block Game."
  en: "Suite of RL agents (MCTS, DQN, PPO) for Breakout, Checkers, and Block Game."
details:
  ru: "Исследовательский проект по обучению с подкреплением. Реализация кастомных сред Gymnasium, CNN для обработки визуальных данных, Monte Carlo Tree Search и алгоритмов PPO/DQN."
  en: "Reinforcement Learning research project. Implementation of custom Gymnasium environments, CNNs for visual processing, Monte Carlo Tree Search, and PPO/DQN algorithms."
tags:
  [
    "Python",
    "PyTorch",
    "Gymnasium",
    "MCTS",
    "DQN",
    "PPO",
    "Reinforcement Learning",
  ]
pubDate: 2023-11-10
status: "archived"
type: "ml"
---

### RU

Глубокое погружение в Reinforcement Learning. Реализовал и обучил агентов для трех различных сред, решая задачи разной сложности. Для шашек (Checkers) написал **кастомное окружение Gymnasium** с нуля, закодировав сложную логику мульти-взятий и дам. Обучение проводил через **DQN** с выходным слоем на 4096 действий, используя ELO-рейтинг для оценки прогресса модели против самой себя.

В проекте Breakout применил **CNN (Convolutional Neural Networks)** для обработки "сырых" пикселей экрана, внедрив технику Frame Stacking для понимания динамики движения мяча. Для логической игры Block Game реализовал алгоритм **Monte Carlo Tree Search (MCTS)**, который симулирует исходы ходов, позволяя ИИ планировать стратегию без нейросетей.

### EN

A comprehensive exploration of Reinforcement Learning algorithms applied to complex environments. For Checkers, I engineered a **custom Gymnasium environment** from scratch to handle multi-step capturing logic and trained a **DQN agent** with a massive action space (4096 outputs), benchmarking performance via self-play ELO ratings.

For Atari Breakout, I implemented a **Deep Q-Network with CNNs**, utilizing frame stacking to allow the agent to perceive ball velocity and trajectory from raw pixels. Additionally, I built a pure algorithmic solver for a Block Game using **Monte Carlo Tree Search (MCTS)**, enabling the AI to look ahead and strategize effectively without model training.
