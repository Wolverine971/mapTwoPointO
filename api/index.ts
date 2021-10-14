import api from 'axios'
import { BingResp } from './models'
const censusUrl = 'https://data.census.gov/api/'
export default {

// its all about the number!!
  async getTigerState (text: string) {
    // states === 0
    // "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/18/query?where=&text=" + req.params.name +            "&objectIds=&time= &geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson"
    try {
      return await api.get(`https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/0/query?where=&text=${text}&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson`
      // return await api.get('https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/18/query?where=&text=' + text +  '&objectIds=&time= &geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson'
      )
        .then(resp => {
          return formatResponse(resp)
        })
    } catch (error) {
      console.error(error)
    }
  },

  async getTigerCounty (text: string | undefined) {
    // counties === 1
    try {
      return await api.get(`https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/1/query?where=&text=${text}&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson`
      )
        .then(formatResponse)
    } catch (error) {
      console.error(error)
    }
  },
  async getTigerZip (text: string | undefined) {
    // PUMA_TAD_TAZ_UGA_ZCTA/MapServer === 0
    try {
      return await api.get(`https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/PUMA_TAD_TAZ_UGA_ZCTA/MapServer/0/query?where=&text=${text}&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson`
      )
        .then(formatResponse)
    } catch (error) {
      console.error(error)
    }
  },
  async getTigerMicro (text: string | undefined) {
    // PUMA_TAD_TAZ_UGA_ZCTA/MapServer === 0
    try {
      return await api.get(`https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/PUMA_TAD_TAZ_UGA_ZCTA/MapServer/2/query?where=&text=${text}&objectIds=&time=&geometry=&geometryType=esriGeometryPolygon&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson`
      )
        .then(formatResponse)
    } catch (error) {
      console.error(error)
    }
  },

  async getVectorTile (text: string) {
    try {
      return await api.get('http://localhost:8080/api/map/' + text)
        .then(formatResponse)
    } catch (error) {
      console.error(error)
    }
  },
  bingLocation (text: any): Promise<BingResp> {
    console.log(process.env.VUE_APP_BING_KEY)
    return api.get(`http://dev.virtualearth.net/REST/v1/Autosuggest?query=${text}&maxResults=10&key=${process.env.VUE_APP_BING_KEY}`) // process.env.BING_KEY

      .then(formatResponse)
  },

  typeahead (text: any) {
    return api.post('https://data.census.gov/api/typeahead', {
      request: {
        text
      }
    }).then(formatResponse)

    // if (request !== null) {
    // //   let newReq =
    // //   {text: request}
    //   api.post('https://data.census.gov/api/typeahead', {text: request})
    //     .then(response => {
    //       if (response && response.data) {
    //         return response.data
    //       } else {

    //       }
    //     })
    //     .catch(e => {
    //       throw Error(e)
    //     })
    // }
  },
  geoCodeSearch (address: string) {
    // specify &region=es&
    /// ///////////////////////////////////////////////////here//////////////////////////////////
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                address + '/' + process.env.GOOGLE_KEY)
    /// /////////////////////////////////////////////do the thangs/////////////////////////////
    // 'https://api.publicapis.org/entries')
    // can return viewport size
    // "viewport" : {
    //    "northeast" : {
    //       "lat" : 50.8601041,
    //       "lng" : 0.5957329
    //    },
    //    "southwest" : {
    //       "lat" : 50.8559061,
    //       "lng" : 0.5906163
    //    }
    // }
      .then(res => res.json())
      .then(res => {
        const {
          count,
          entries
        } = res
        // this.count = count
        // this.entries = entries
        return {count, entries}
      })
    // reverse lookup
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
      .catch(err => {
        console.log(err)
      })
  },
  getCreds () {
    // api.post()
    //   .then(response => {
    //     if (response && response.data) {
    //       return response.data
    //     } else {
    //         console.log('failed to get creds')

    //     }
    //   })
    //   .catch(e => {
    //     throw Error(e)
    //   })
  },
  archGis (word: any) {
    // fetch('http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query')
    const body = {
      text: word,
      geometry: null,
      geometryType: 'esriGeometryPoint',
      inSR: null,
      spatialRel: 'esriSpatialRelIntersects',
      relationParam: null,
      objectIds: null,
      where: null,
      time: null,
      returnCountOnly: false,
      returnIdsOnly: false,
      returnGeometry: true,
      maxAllowableOffset: null,
      outSR: null,
      outFields: null,
      f: 'pjson'
    }
    const headers = {
      // Host: 'sampleserver1.arcgisonline.com',
      // Connection: 'keep-alive',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      // Origin: 'http://sampleserver1.arcgisonline.com',
      'Upgrade-Insecure-Requests': '1',
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
      Accept: 'application/xhtml+xml,application/json,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      // Referer: 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query?text=' + word,
      // 'Accept-Encoding': 'gzip, deflate',
      // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Accept-Language': 'en-US,en;q=0.9',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }

    return api('http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query', {
      method: 'post',
      // url: 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query',
      headers: headers,
      data: body
    })
    // api.get('http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query')
      .then(response => {
        return response
      })
      .catch(e => {
        return e
      })
  },

  // fetch('http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/1/query?where=UPPER(STATE_NAME)=UPPER(' + word + ')')
  //   .then(response => {
  //     if (response && response.data) {
  //       return response.data
  //     } else {

  //     }
  //   })
  //   .catch(e => {
  //     throw Error(e)
  //   })

  getGeoTypeAhead (text: any) {
    return api.post(censusUrl + '/api/typeahead', {
      request: {
        text: text,
        type: 'geo',
        geoIds: [],
        topics: [],
        naicsCodes: [],
        program: '',
        dataset: '',
        vintage: '',
        summaryLevels: [],
        selectedSummaryLevel: '',
        from: 0,
        size: 100
      }
    }).then(formatResponse)
  },

  getGeoTypeAheadSummaryLevelWithin (selectedSummaryLevel: any, summaryLevels: any, withins: any, from: any, size: any) {
    return api.post(censusUrl + '/api/typeahead', {
      'request': {
        'type': 'geo',
        'text': '',
        'geoIds': [],
        'topics': [],
        'naicsCodes': [],
        'program': '',
        'dataset': '',
        'vintage': '',
        'from': from,
        'size': size,
        'selectedSummaryLevel': selectedSummaryLevel,
        'summaryLevels': summaryLevels,
        'withins': withins
      }
    }).then(formatResponse)
  },

  search (query: any) {
      console.log(query)
    return api.post(censusUrl + '/api/search', {
      'request': Object.assign(getSearchParameters(), {
        'sortParameter': 'Relevance',
        'sortOrderReverse': false,
        'text': '',
        'skipSpellcheck': false
      })
    }).then(formatResponse)
  },

  getFacets () {
    return api.post(censusUrl + '/api/search', {
      'request': Object.assign(getSearchParameters(), {
        'services': ['facets'],
        'sortParameter': 'Relevance',
        'sortOrderReverse': false,
        'text': '',
        'skipSpellcheck': false
      })
    })
      .then(formatResponse)
  },

  // outside call to get web results for specific query
  webPage (keyWords = [], geoNames = [], topicNames = [], page = 1) {
    let params
    if (keyWords.length > 0 || geoNames.length > 0 || topicNames.length > 0) {
      params = {
        keyWords: keyWords || [],
        geoNames: geoNames || [],
        topicNames: topicNames || [],
        page: page || 1
      }
    } else {
      params = {
        keyWords: 'united states',
        page: page || 1
      }
    }
    return api({
      method: 'get',
      url: censusUrl + '/cedsci/webList',
      params: params
    })
      .then(formatResponse)
  }

}

// return a default set of search parameters
function getSearchParameters () {
  return {
    'geoIds': [],
    'topics': [],
    'naicsCodes': [],
    'program': '',
    'dataset': '',
    'vintage': '',
    'from': 0,
    'size': 10,
    'sortOrderReverse': false,
    'text': '',
    'skipSpellcheck': false
  }
}

/**
 * some responses come back using an response object, this function peels that away
 * @param rsp is the raw data response
 * @returns {*} the response data
 */
export function formatResponse (rsp: { data?: any }) { // {data: {response: any}} <- could be
  if (!rsp) {
    throw new Error('No Response')
  }

  if (!Object.keys(rsp)) {
    throw new Error('The data is not yet available.')
  }

  if (rsp.data === 'Unauthorized Request') {
    throw new Error('Unauthorized Request')
  }

  return (rsp.data && rsp.data.response) || rsp.data || rsp
}
