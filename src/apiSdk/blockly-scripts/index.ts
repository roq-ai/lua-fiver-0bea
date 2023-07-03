import axios from 'axios';
import queryString from 'query-string';
import { BlocklyScriptInterface, BlocklyScriptGetQueryInterface } from 'interfaces/blockly-script';
import { GetQueryInterface } from '../../interfaces';

export const getBlocklyScripts = async (query?: BlocklyScriptGetQueryInterface) => {
  const response = await axios.get(`/api/blockly-scripts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBlocklyScript = async (blocklyScript: BlocklyScriptInterface) => {
  const response = await axios.post('/api/blockly-scripts', blocklyScript);
  return response.data;
};

export const updateBlocklyScriptById = async (id: string, blocklyScript: BlocklyScriptInterface) => {
  const response = await axios.put(`/api/blockly-scripts/${id}`, blocklyScript);
  return response.data;
};

export const getBlocklyScriptById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/blockly-scripts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBlocklyScriptById = async (id: string) => {
  const response = await axios.delete(`/api/blockly-scripts/${id}`);
  return response.data;
};
