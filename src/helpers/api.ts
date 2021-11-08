import moment from 'moment';

export const objToQuery = (obj: any): string => {
  if (!obj) return '';

  var query = [];

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      query.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
    }
  }

  return '?' + query.join('&');
};

export const objToFormData = (object: any): FormData => {
  let fd = new FormData();
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (Array.isArray(object[key])) {
        fd.append(key, JSON.stringify(object[key]));
      }
      fd.append(key, object[key]);
    }
  }

  return fd;
};

export const defaultParmasAPI = (currentpage?: number | string, limit?: number | string) => {
  return {
    currentpage: currentpage ? currentpage.toString() : 0,
    currentdate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    limit: limit ? limit.toString() : 20,
  };
};

export const getCurrentDate = () => {
  return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
};

export const getDateOfDatetime = (value: Date): string => {
  return moment(value).format('DD/MM/YYYY');
};

export const searchParamsAPI = (typefilter?: string, currentpage?: number | string, limit?: number | string, kindschoolid?: string) => {
  return {
    typefilter: typefilter ? typefilter.toString() : 'AllSchool',
    currentpage: currentpage ? currentpage.toString() : 0,
    currentdate: moment(new Date()).format('YYYY-MM-DD'),
    limit: limit ? limit.toString() : 25,
    kindschoolid: kindschoolid ? kindschoolid.toString() : '0',
  };
};

export const notificationParamsAPI = (currentpage?: number | string, limit?: number | string, typeproject?: string | number) => {
  return {
    currentpage: currentpage ? currentpage.toString() : 0,
    currentdate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    limit: limit ? limit.toString() : 10,
    typeproject: typeproject ? typeproject.toString() : '1',
  };
};

export const fanpageParamsAPI = (currentpage?: number | string, limit?: number | string, status?: string | number, findstring?: string | number) => {
  return {
    currentpage: currentpage ? currentpage.toString() : 0,
    currentdate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    limit: limit ? limit.toString() : 10,
    status: status ? status.toString() : 'MyPage',
    findstring: findstring ? findstring.toString() : '',
  };
};
