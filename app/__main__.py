from flask import Flask,render_template,Response
from poseEstimation import PoseDetector
import cv2

app=Flask(__name__)
cam = cv2.VideoCapture(0)
detector = PoseDetector(
    staticMode=False,
    modelComplexity=1,
    smoothLandmarks=True,
    enableSegmentation=False,
    smoothSegmentation=True,
    detectionCon=0.5,
    trackCon=0.5
)

def check_posture():
    draw = False
    while True:
        success, img = cam.read()
        if not success:
            break
        else:
            img = detector.findPose(img, draw=draw)
            lmList, bboxInfo = detector.findPosition(img, draw=draw, bboxWithHands=False)

            if lmList:
                center = bboxInfo["center"]
                cv2.circle(img, center, 5, (255, 0, 255), cv2.FILLED)

                # Calculate the distance between landmarks 11 and 15 and draw it on the image
                length, img, info = detector.findDistance(lmList[11][0:2],
                                                            lmList[25][0:2],
                                                            img=img,
                                                            color=(255, 0, 0),
                                                            scale=10,
                                                            draw = draw)

                # Calculate the angle between landmarks 11, 13, and 15 and draw it on the image
                angle, img = detector.findAngle(lmList[11][0:2],
                                                lmList[23][0:2],
                                                lmList[25][0:2],
                                                img=img,
                                                color=(0, 0, 255),
                                                scale=5,
                                                draw=draw)

                isCloseAngle90 = detector.angleCheck(myAngle=angle,
                                                        targetAngle=90,
                                                        offset=10)
                isCloseAngle180 = detector.angleCheck(myAngle=angle,
                                                        targetAngle=180,
                                                        offset=10)
                if isCloseAngle90 or isCloseAngle180:
                    cv2.putText(img, "Correct", ( 50,  50),
                        cv2.FONT_HERSHEY_TRIPLEX, 3, (0, 255, 0), 3)
                else:
                    cv2.putText(img, "Bad Posture", ( 50,  50),
                        cv2.FONT_HERSHEY_TRIPLEX, 3, (0, 0, 255), 3)
                ret, buffer = cv2.imencode(".jpg", img)
                if ret:
                    img = buffer.tobytes()
                    yield(b'--frame\r\n'
                        b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')

@app.route('/',methods=['GET','POST'])
def home():
    return render_template("index.html", home="active")

@app.route("/services", methods=["GET", "POST"])
def service():
    Vars = {"services":"active"}
    return render_template("services.html", **Vars)

@app.route("/contact-us", methods=["GET", "POST"])
def contact():
    Vars = {"contact":"active"}
    return render_template("contact.html", **Vars)

@app.route("/about-us", methods=["GET", "POST"])
def about():
    Vars = {"about":"active"}
    return render_template("about.html", **Vars)

@app.route("/diet-generator", methods=["GET", "POST"])
def diet():
    return render_template('dietgenerator.html', services="active")

@app.route("/posture-checker")
def checker():
    return render_template("posture-checker.html", services="active")

@app.route("/video")
def video():
    return Response(check_posture(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    #DEBUG is SET to TRUE. CHANGE FOR PROD
    app.run(port=5000,debug=True)
