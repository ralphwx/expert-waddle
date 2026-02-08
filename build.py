
import os

exit_code = os.system("npm run build")
print("Exit code: ", exit_code)
if exit_code != 0: exit(1)

with open("./build/index.html") as f:
    original_html = f.read()

new_html = original_html.replace("/static", "./static")
with open("./build/index.html", "w") as f:
    f.write(new_html)

os.system("mkdir -p docs/")
os.system("cp -r build/* docs/")
