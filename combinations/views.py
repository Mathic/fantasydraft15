from django.shortcuts import render

# from combinations.models import Fighter

# Create your views here.
def index(request):
	return render(request, "index.html")