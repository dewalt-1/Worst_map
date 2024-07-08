import requests
from bs4 import BeautifulSoup

def get_reviews_data():

    url = "https://www.google.com/async/reviewDialog?hl=en_us&async=feature_id:0x47f04f5d41820409:0x3b78040a1fd7bfae,next_page_token:,sort_by:qualityScore,start_index:,associated_topic:,_fmt:pc"

    """https://www.google.com/maps/place/FAC-HABITAT+R%C3%A9sidence+Chauvelles/@46.9962138,3.1610514,17z/data=!4m8!3m7!1s0x47f04f5d41820409:0x3b78040a1fd7bfae!8m2!3d46.9962138!4d3.1636263!9m1!1b1!16s%2Fg%2F113j_7bhh?entry=ttu"""

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"
    }

    response = requests.get(url, headers=headers)

    soup = BeautifulSoup(response.content, 'html.parser')
    
    user = []
    location_info = {}
    data_id = ''
    token = ''
    
    for el in soup.select('.lcorif'):
        print(el)
        # data_id = soup.select_one('.loris')['data-fid']
        # token = soup.select_one('.gws-localreviews__general-reviews-block')['data-next-page-token']
        # location_info = {
        #     'title': soup.select_one('.P5Bobd').text.strip(),
        #     'address': soup.select_one('.T6pBCe').text.strip(),
        #     'avgRating': soup.select_one('span.Aq14fc').text.strip(),
        #     'totalReviews': soup.select_one('span.z5jxId').text.strip()
        # }

    for el in soup.select('.gws-localreviews__google-review'):
        print(el)
        # user.append({
        #     'name': el.select_one('.TSUbDb').text.strip(),
        #     'link': el.select_one('.TSUbDb a')['href'],
        #     'thumbnail': el.select_one('.lDY1rd')['src'],
        #     'numOfreviews': el.select_one('.Msppse').text.strip(),
        #     'rating': el.select_one('.EBe2gf')['aria-label'],
        #     'review': el.select_one('.Jtu6Td').text.strip(),
        #     'images': [d['style'][21:d['style'].rindex(')')] for d in el.select('.EDblX .JrO5Xe')]
        # })

    print("LOCATION INFO: ")
    print(location_info)
    print("DATA ID:")
    print(data_id)
    print("TOKEN:")
    print(token)
    print("USER:")

    for user_data in user:
        print(user_data)
        print("--------------")

get_reviews_data()