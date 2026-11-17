# How to put your bakery website online

Good news: your finished website is just a folder of ordinary files. There is no server to
set up and no monthly software bill. You can put it online for free in a few minutes.

The finished website is the folder called **dist** inside the **app** folder. It contains the
five pages (Home, Menu, Order, Our Story, Visit) and a subfolder called **assets** with the
styling and scripts. Always upload the whole **dist** folder — if you leave the assets
behind, the pages will look plain and the buttons will not work.

## The easiest way — drag and drop (free)

1. Open a web browser and go to **https://app.netlify.com/drop**
2. Open File Explorer and find the **dist** folder inside **app**.
3. Drag the **dist** folder itself onto the Netlify page. (Drag the folder, not the files
   inside it.)
4. Wait a few seconds. Netlify will give you an address like
   `https://something-random.netlify.app`. That is your live website — open it on your
   phone to check it, then share the address with your customers.
5. In Netlify's site settings you can change the random name into something like
   `your-bakery.netlify.app`.

If you already use GitHub, the same folder can go on **GitHub Pages** or **Vercel**; both
are free for a site this size. Whichever you pick, upload the contents of **dist**.

## Before you share the address

The site currently shows a sample bakery called **Hearth & Crumb**, with a made-up address,
phone number and email. Tell me your real bakery name, address, phone and email and I will
swap them in. You can also send me your own photos and I will put them on the pages.

The order button works: customers choose items, pick a pickup time and get an order number.
But right now the order only appears on the customer's screen — it is **not** emailed to you
and no payment is taken online (payment is "pay when you pick up"). If you want orders sent
to your inbox or a card payment taken online, tell me and we can add that next.

## If you ever change the site

After I make changes, build it again from the **app** folder, then upload the new **dist**
folder the same way. Your host will replace the old files and the new version goes live.
