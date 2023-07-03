import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface BlocklyScriptInterface {
  id?: string;
  script_content: string;
  user_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface BlocklyScriptGetQueryInterface extends GetQueryInterface {
  id?: string;
  script_content?: string;
  user_id?: string;
  organization_id?: string;
}
