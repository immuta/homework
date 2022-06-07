FROM python:3

RUN pip install --user --upgrade essential_generators flask randomtimestamp

COPY api.py .

CMD ["python", "api.py"]
