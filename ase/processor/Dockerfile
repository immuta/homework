FROM python:3

RUN pip install --user --upgrade elasticsearch==7.17.0

COPY processor.py .

CMD ["python", "processor.py"]
