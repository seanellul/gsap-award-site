import cv2, pathlib

src = "hero.mp4"
out_dir = pathlib.Path("frames")
out_dir.mkdir(exist_ok=True)

cap = cv2.VideoCapture(src)
frame_id = 0

while True:
    ok, frame = cap.read()
    if not ok:         # end-of-video or read error
        break

    filename = out_dir / f"f_{frame_id:06}.jpg"
    cv2.imwrite(str(filename), frame)   # <- convert Path to str
    frame_id += 1

cap.release()
print(f"Saved {frame_id} JPEGs to {out_dir.resolve()}")
