import { useEffect, useState } from "react";
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from "@tensorflow/tfjs";                         // <- IMPORTANTE
import "@tensorflow/tfjs-backend-webgl";                        // <- BACKEND WEBGL
import "@tensorflow/tfjs-backend-cpu";                          // <- BACKEND CPU
import { useRef } from "react";

const ObjectDetection = () => {
    const webcamRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [videoReady, setVideoReady] = useState(false);

    const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);

    // --- INITIALIZE TFJS BACKEND ---
    useEffect(() => {
        const initTF = async () => {
            await tf.setBackend("webgl");   // Usa WebGL (rápido)
            await tf.ready();               // Espera inicialización
            console.log("TensorFlow.js listo ✔");
        };

        initTF();
    }, []);

    // Load model
    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await cocoSsd.load();
            console.log("Modelo cargado correctamente");
            setModel(loadedModel);
        }
        loadModel();
    }, []);

    // Start webcam
    useEffect(() => {
        const startCamera = async () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false,
                });

                if (webcamRef.current) {
                    webcamRef.current.srcObject = stream;

                    webcamRef.current.onloadeddata = () => {
                        console.log("VIDEO LISTO ✔");
                        setVideoReady(true);
                    };
                }
            }
        }
        startCamera();
    }, []);

    // Detection loop
    useEffect(() => {
        if (!model || !videoReady) return;

        console.log("videoWidth:", webcamRef.current?.videoWidth);
        console.log("videoHeight:", webcamRef.current?.videoHeight);

        const detectFrame = async () => {
            if (
                webcamRef.current &&
                canvasRef.current &&
                webcamRef.current.videoWidth > 0
            ) {
                const video = webcamRef.current;
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');

                if (!ctx) return;

                // Ajustar canvas al tamaño de video
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                console.log("Modelo actual:", model);

                const predictions = await model.detect(video);
                console.log("Predictions:", predictions);

                // Limpiar canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Dibujar detecciones
                predictions.forEach((pred) => {
                    const [x, y, width, height] = pred.bbox;

                    // caja
                    ctx.strokeStyle = 'lime';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(x, y, width, height);

                    // Etiqueta
                    ctx.font = '18px Arial';
                    ctx.fillStyle = 'yellow';
                    ctx.fillText(`${pred.class} ${Math.round(pred.score * 100)}%`, x, y - 5);
                })

                requestAnimationFrame(detectFrame);
            }
        }

        detectFrame();
    }, [model, videoReady]);

    return (
        <div style={{ position: "relative", width: "fit-content" }}>
            <video
                ref={webcamRef}
                autoPlay
                muted
                playsInline
                style={{ width: "720px", borderRadius: "10px" }}
            />
            <canvas ref={canvasRef}
                style={{ position: "absolute", top: 0, left: 0 }} />
        </div>
    )
}

export default ObjectDetection