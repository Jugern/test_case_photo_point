from django.shortcuts import render

def home_page(request):
    return render(request, 'base.html')


def get_current_usd(request):
    return render(request, 'get-current-usd.html')
