export interface DependencyStatus {
    name : string;
    isAvailable : boolean;
    version : string | null;
    error? : string;

}