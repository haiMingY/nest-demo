/**
 * 返回数据类
 */

export default class ResponseData<T> {
  // 返回状态biaoshi
  code!: string | number;
  // 返回数据
  data!: T;
  // 时间戳
  timestamp!: number;
  // 提示信息
  message!: string;

  static create<T>(
    code: string | number,
    data: T,
    message: string,
  ): ResponseData<T> {
    const rd = new ResponseData<T>();
    rd.code = code;
    rd.data = data;
    rd.message = message;
    rd.timestamp = Date.now();
    return rd;
  }
}
