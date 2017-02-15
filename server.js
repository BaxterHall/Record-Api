const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');


const artists = Artists();
const albums = Albums()


app.set('view engine', 'ejs');

app.get('/', (req, res) => {




    res.render('pages/index', { artists, albums });
});

app.get('/artist/:id', (req, res) => {

    let options = {
        url: 'https://api.discogs.com/artists/' + req.params.id+"?key=kkUyQrnWBKLBGGXSXZZe&secret=bfSAnNcJZbMeiTbEZmKYfbngXvDKKHOE",
        headers: {
            'User-Agent': 'hawkbrogen'
        }
    };

    //+ 'token=ISpTKqVKuyZPxJatZNACvChQoWhcJBjuDydIBhoa'
    request(options, function (error, data) {

        let options2 = {
            url: 'https://api.discogs.com/artists/' + req.params.id + '/releases?key=kkUyQrnWBKLBGGXSXZZe&secret=bfSAnNcJZbMeiTbEZmKYfbngXvDKKHOE',
            headers: {
                'User-Agent': 'hawkbrogen'
            }
        };
         let artist = JSON.parse(data.body);
        request(options2, function (error, data) {
            

            let releases = JSON.parse(data.body)

            if (error) {
                console.log('uh oh')
            };
            // console.log(releases);
            res.render('pages/artist', { artist: artist, albums: releases.releases });
        })

        
       

        // console.log(releases)


        if (error) {
            console.log("oh no")
        };
    })

});

app.get('/searchresult', (req, res) => {

    let options3 = {
        url: 'https://api.discogs.com/database/search?q=' + req.query.q +'&token=ISpTKqVKuyZPxJatZNACvChQoWhcJBjuDydIBhoa',
        headers: {
            'User-Agent': 'hawkbrogen'
        }
    };
    // console.log(req.query.q)

    request(options3, function (error, data) {


        let searched = JSON.parse(data.body)


        // console.log(searched)
        res.render('pages/searchresult', {searched})


    })


});

app.get('/master/:id', (req, res) => {

   

    let options4 = {
        url: 'https://api.discogs.com/masters/'+ req.params.id + '?key=kkUyQrnWBKLBGGXSXZZe&secret=bfSAnNcJZbMeiTbEZmKYfbngXvDKKHOE',
        headers: {
            'User-Agent': 'hawkbrogen'
        }
    };
    // console.log(req.params.id)

    request(options4, function (error, data) {


        let album = JSON.parse(data.body)


        // console.log(album);
        
        if (error) {
            console.log('uhoh')
        };

    res.render('pages/master',{album})
    });
});

app.get('/releases/:id', (req, res) => {

   

    let options5 = {
        url: 'https://api.discogs.com/releases/'+ req.params.id + '?key=kkUyQrnWBKLBGGXSXZZe&secret=bfSAnNcJZbMeiTbEZmKYfbngXvDKKHOE',
        headers: {
            'User-Agent': 'hawkbrogen'
        }
    };
    // console.log(req.params.id)

    request(options5, function (error, data) {


        let album = JSON.parse(data.body)


        // console.log(album);
        
        if (error) {
            console.log('uhoh')
        };

    res.render('pages/releases',{album})
    });
});

app.get('/label/:id', (req, res) => {

    let options6 = {
        url: 'https://api.discogs.com/labels/' + req.params.id+"?key=kkUyQrnWBKLBGGXSXZZe&secret=bfSAnNcJZbMeiTbEZmKYfbngXvDKKHOE",
        headers: {
            'User-Agent': 'hawkbrogen'
        }
    };

    request(options6, function (error, data) {

         let options7 = {
            url: 'https://api.discogs.com/labels/' + req.params.id + '/releases?key=kkUyQrnWBKLBGGXSXZZe&secret=bfSAnNcJZbMeiTbEZmKYfbngXvDKKHOE',
            headers: {
                'User-Agent': 'hawkbrogen'
            }
        };  
        let label = JSON.parse(data.body); 
            request(options7, function (error, data) {
            
                 
            let releases = JSON.parse(data.body)

            if (error) {
                console.log('uh oh')
            };
            // console.log(releases);
            res.render('pages/label', {label, albums: releases.releases });
        })    
    });
});

app.get('/searchresult/:name', (req,res) => {

    let option8 = {
    url: 'https://api.discogs.com/database/search?q=' + req.params.name + '&token=ISpTKqVKuyZPxJatZNACvChQoWhcJBjuDydIBhoa',
    headers: {
        'User-Agent': 'hawkbrogen'
        }
    };
    
        request(option8, function (error,data) {
            let searched = JSON.parse(data.body);
    if (error) {
        console.log('you dun fucked up now')
             }   
        
    res.render('pages/searchresult', {searched});
     }); 
});
app.use(express.static('public'));


app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});

function Artists() {
    return [{
        name: 'Black Flag',
        image: 'images/blackflag.jpg',
        id: '253278'
    }, {
        name: 'The Pixies',
        image: 'images/pixies.jpg',
        id: '231577',
    }, {
        name: 'The Replacements',
        image: 'images/replacements.jpg',
        id: '268769',
    }, {
        name: 'Fugazi',
        image: 'images/fugazi.jpg',
        id: '82103',
    }, {
        name: 'Modest Mouse',
        image: 'images/modestmouse.jpg',
        id: '187919',

    }, {
        name: 'Taylor Swift',
        image: 'images/tswift.jpg',
        id: '1124645',
    }, {
        name: 'Culture Abuse',
        image: 'images/culture.jpg',
        id: '4204810',        
    },{
        name: 'Cold War Kids',
        image: 'images/coldwarkids.jpg',
        id: "681712",
  }]
};

function Albums() {
    return [{
        name: 'The Agent Intellect',
        image: 'images/agent.jpg',
        id: '7561509',
    },{
        name: 'The Monitor',
        image: 'images/monitor.jpg',
        id: '2172968',
    }, {
        name: 'Post-Nothing',
        image: 'images/post.jpg',
        id: '1995189',
    }, {
        name: 'In Name And Blood',
        image: 'images/blood.jpg',
        id: '3243983'
    }, {
        name: 'The Age Of Quarrel',
        image: 'images/quarrel.jpg',
        id: '1432330',
    }, {
        name: 'Reasonable Doubt',
        image: 'images/doubt.jpg',
        id: '352213',
    }, {
        name: 'Ready To Die',
        image: 'images/ready.jpg',
        id: '257768',
    }, {
        name: "It's Alive",
        image: 'images/alive.jpg',
        id: '888102',   
    }]


}