# 🧠 3D Model Viewer with Animation & HDRI | Three.js + GSAP

A lightweight, responsive 3D model viewer built with **Three.js**, **GLTFLoader**, **GSAP** for smooth mouse interaction, and **HDRI lighting**. Easily view animated `.glb` models with support for rotation and reflections.

## 🖼️ Quick Preview

| Model          | Preview                                   |
| -------------- | ----------------------------------------- |
| Flying Skibidi | ![Skibidi](assets/skibidi_flying_saw.png) |
| Flying Robot   | ![Robot](assets/flying_robot.png)         |
| Monster Boss   | ![Boss](assets/monster_boss.png)          |

---

## 📸 Demo Videos

### 🚀 Skibidi Flying Saw

## <video autoplay loop muted src="https://raw.githubusercontent.com/IamNishant51/3D-Model-Viewer/assets\skibidi_flying_saw.mp4" width="500"></video>

### 🤖 Flying Robot

## <video autoplay loop muted src="[https://raw.githubusercontent.com/IamNishant51/3D-Model-Viewer/assets/flying_robot.mp4](https://github.com/user-attachments/assets/cd2e4e33-2220-4603-abf0-0b625cf85289
)" width="500"></video>


### 👻 Monster Boss

## <video autoplay loop muted src="https://raw.githubusercontent.com/IamNishant51/3D-Model-Viewer/assets/flying_monster.mp4" width="500"></video>

## ✨ Features

- ✅ Drag-to-rotate (mouse-based)
- ✅ Smooth GSAP rotation animation
- ✅ `.glb` animation playback via AnimationMixer
- ✅ Environment lighting using `.exr` HDRI
- ✅ Auto-centering & smart scaling for any 3D model
- ✅ Easily change models from the `public/` folder

---

## 📁 Folder Structure

## Structure Explanation

### Public Files

- `public/` – Static files that are directly served to the browser
  - `skibidi_flying_saw.glb` – 3D model
  - `flying_robot.glb` – 3D model
  - `flying_monster.glb` – 3D model
  - `provence_studio_2k.exr` – HDRI map for lighting

### Source Code

- `src/`
  - `main.js` – Main application logic: loads models, handles animation, rendering, and events
  - `style.css` – Base styling for the canvas and layout

### Configuration

- `vite.config.js` – Vite build configuration
- `package.json` – Project metadata and dependencies
- `.gitignore` – Files and folders ignored by Git
